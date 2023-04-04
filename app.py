from flask import Flask, render_template, request
import requests
import openai
from dotenv import load_dotenv
import os

app = Flask(__name__)

# Set up OpenAI API credentials
load_dotenv()
#openai_organization = os.getenv('OPENAI_ORGANIZATION') This one is not necessary for this App
openai_api_key = os.getenv('OPENAI_API_KEY')
model_id = 'gpt-3.5-turbo'

# Define the Flask route that displays the form
@app.route('/')
def index():
    return render_template('form.html')

# Define the Flask route that handles the form submission
@app.route('/submit', methods=['POST'])
def submit_form():
    print("form submitted")
    # Get the form data from the request
    patient_height = request.form.get('height', '')
    weight = request.form.get('weight', '')
    age = request.form.get('age', '')
    gender = request.form.get('gender', '')
    walk = request.form.get('walk', '')
    exercise = request.form.get('exercise', '')
    fruits_veggies = request.form.get('fruits_veggies', '')
    legumes = request.form.get('legumes', '')
    sleep = request.form.get('sleep', '')
    sleep_reason = request.form.getlist('sleep_reason[]')
    hypertension = request.form.get('hypertension', '')
    diabetes = request.form.get('diabetes', '')
    smoking = request.form.get('smoking', '')
    alcohol = request.form.get('alcohol', '')
    nervous = request.form.get('nervous', '')
    depressed = request.form.get('depressed', '')
    difficult = request.form.get('difficult', '')
    worthless = request.form.get('worthless', '')
    smoking = request.form.get('smoking', '')


    # Construct the mytext variable based on the form data
    mytext = f"Prepare some lifestyle advice for the prevention of cancer, for a person with the following characteristics: {patient_height}cm tall weights {weight}kg and is a {age}-year-old {gender}.  This person took the following lifestyle and medical history questionnaire and next to each question is the answer obtained. Your essay please separate it into Introduction, Exercise, Sleep, Diet, Communication, Alcohol, Hobbies, Mental Health and Conclusion sections. "
    mytext += f"\nPhysical Activity:\nHow much do you walk everyday? {walk}."
    mytext += f"\nIn a week how many times you exercise more than 30 minutes? {exercise}."
    mytext += f"\nDiet:\nEveryday how many portions of fruits and vegetables do you eat? {fruits_veggies}."
    mytext += f"\nIn a week, how many portions of legumes do you eat? {legumes}."
    mytext += f"\nSleep:\nIn the past months, how would you qualify your own sleep? {sleep}."
    if sleep_reason:
        mytext += "\nWhich of the following reasons apply to your sleep? Select all that apply."
        for reason in sleep_reason:
            mytext += f"\n- {reason}"
    mytext += f"\nMedical History:\nHave you ever been told you have hypertension? Or are you on treatment for hypertension? {hypertension}."
    mytext += f"\nHave you ever been told you have diabetes? Or are you on treatment for diabetes? {diabetes}."
    mytext += f"\nDo you smoke? {smoking}."
    mytext += f"\nHow much alcohol do you drink per day? {alcohol}."
    mytext += f"\nMental Health:\nIn the past month, did you feel nervous?{nervous}."
    mytext += f"\nIn the past month, did you feel depressed and like nothing could make you feel better? {depressed}."
    mytext += f"\nIn the past month, did you feel that anything you did was foolish?{difficult}."
    mytext += f"\nIn the past month, did you feel worthless? {worthless}."

    print("mytext", mytext)

    testtext = "why my cat is so cute, answer within 20 words"

    # Call the OpenAI API
    URL = "https://api.openai.com/v1/chat/completions"
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [{"role": "user", "content": mytext}],
        "temperature" : 1.0,
        "top_p":0.7,
        "n" : 1,
        "stream": False,
        "presence_penalty":0,
        "frequency_penalty":0,
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
        print("response_dataaaaaa", response_data)
        generated_text = response_data["choices"][0]["message"]["content"].strip()
        print("generated_textttt",generated_text)
        
        # Render the result template
        return render_template('results.html', generated_text=generated_text)
    else:
        return "Error calling OpenAI API"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)