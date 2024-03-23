from flask import Blueprint, request, jsonify
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from app.api.aws import (upload_file_to_s3, get_unique_filename)

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': {'form_errors': form.errors, 'message': 'Unauthorized'}}, 401



@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data

        # Debugging: Check if the form data is correctly received
        print("Received form data:", data)

        profilePictureFile = form.profilePictureFile.data

        profilePictureFile.filename = get_unique_filename(profilePictureFile.filename)

        # Debugging: Check the filename after modification
        print("Modified filename:", profilePictureFile.filename)

        upload = upload_file_to_s3(profilePictureFile)
        print(upload)

        if "url" not in upload:
            return jsonify({"error": "S3 upload failed", "details": upload.get("error", "Unknown error")}), 500

        profilePictureFile_url = upload['url']

        # Debugging: Check the URL after upload
        print("Uploaded profile picture URL:", profilePictureFile_url)

        # Create a new user object
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            profilePictureFile=profilePictureFile_url
        )

        # Debugging: Check the user object before adding to the session
        print("User object before adding to session:", user)

        # Add the user object to the session and commit
        db.session.add(user)
        db.session.commit()

        # Debugging: Check if user was successfully committed to the database
        print("User object after commit:", user)

        # Log in the user
        login_user(user)

        # Return user data as JSON response
        return jsonify(user.to_dict())

    # If form validation fails, return errors
    return form.errors, 401



@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401
