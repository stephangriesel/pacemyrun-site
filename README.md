# HealthGPT
Uses ChatGPT API to get customised health advise based on a health questionnaire.

This Repo is linked to my YouTube Tutorial found at: https://youtu.be/Vq7Lf5pI024

# Steps to Run
1. Create a Virtual Environment in python with virtualenv `-p python3.8 venv`
2. Activate venv with `. venv/bin/activate`
3. Install requirements with `pip install -r requirements.txt`
4. Create a .env file in the root folder and add your OpenAI API key as illustrated in the video.
5. Run the app with `python app.py`

Remember ChatGPT API is a paid service. If you get rate limiting errors it could be that your API key is not linked to a paid subscription.
You can create a subscription at: https://platform.openai.com/account/billing/overview
