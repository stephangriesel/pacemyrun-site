# app1_blueprint.py
from flask import Blueprint, render_template, request
import requests
import openai
from dotenv import load_dotenv
import os

app1 = Blueprint('app1', __name__)

# Set up OpenAI API credentials
load_dotenv()
openai_api_key = os.getenv('OPENAI_API_KEY')
model_id = 'gpt-3.5-turbo'
print(" * Your API key is working:",openai_api_key)

# Define the Flask route that displays the form


@app1.route('/')
def index():
    return render_template('form.html')

# Define the Flask route that handles the form submission


@app1.route('/submit', methods=['POST'])
def submit_form():
    print("form submitted")
    # Get the form data from the request
    patient_height = request.form.get('height', '')
    weight = request.form.get('weight', '')
    age = request.form.get('age', '')
    gender = request.form.get('gender', '')
    walk = request.form.get('walk', '')
    experience = request.form.get('experience', '')
    goal = request.form.get('goal', '')
    exercise = request.form.get('exercise', '')
    fruits_veggies = request.form.get('fruits_veggies', '')
    diagnosed = request.form.get('diagnosed', '')
    sleep = request.form.get('sleep', '')
    diagnosed = request.form.getlist('diagnosed[]')

    # Construct the mytext variable based on the form data
    mytext = f"Prepare some lifestyle and training advice for a person that is using running as main form of exercise, this person has the following characteristics: {patient_height}cm tall weights {weight}kg and is a {age}-year-old {gender}.  This person took the following lifestyle and medical history questionnaire and next to each question is the answer obtained. Your essay please separate it into Introduction, Exercise, Experience, Goal, Sleep, Health Risks and Conclusion sections. "
    mytext += f"\nPhysical Activity:\nHow much do you walk everyday? {walk}."
    mytext += f"\nExperience: In level of running experience I see myself as {experience}."
    mytext += f"\nGoal: My goal is to run {goal}."
    mytext += f"\nIn a week how many times you exercise more than 30 minutes? {exercise}."
    mytext += f"\nSleep: In the past months, how would you qualify your own sleep? {sleep}."
    if diagnosed:
        mytext += "\nHealth Risks: Have you been diagnosed with any of the following? Select all that apply."
        for reason in diagnosed:
            mytext += f"\n- {reason}"

    print("mytext", mytext)

    testtext = "why my cat is so cute, answer within 20 words"

    # Call the OpenAI API
    URL = "https://api.openai.com/v1/chat/completions"
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": mytext}],
        "temperature": 1.0,
        "top_p": 0.7,
        "n": 1,
        "stream": False,
        "presence_penalty": 0,
        "frequency_penalty": 0,
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {openai.api_key}"
    }
    response = requests.post(URL, headers=headers, json=payload, stream=False)
    print("responseeeee", response)

    # Process the API response and return the result
    if response.ok:
        response_data = response.json()
        print("🏁 Response Data: ", response_data)
        generated_text = response_data["choices"][0]["message"]["content"].strip(
        )
        print("⭐ Generated Text: ", generated_text)

        # Render the result template
        return render_template('results.html', generated_text=generated_text)
    else:
        return "❌ Error calling OpenAI API"


if __name__ == '__main__':
    app1.run(host='0.0.0.0', port=5080, debug=True)
