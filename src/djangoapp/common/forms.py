from allauth.account.forms import SignupForm
from django import forms

class CustomSignupForm(SignupForm):
    user_type = forms.CharField(max_length=15, required=False)
    def save(self, request):
        user = super(CustomSignupForm, self).save(request)
        user.user_type = self.cleaned_data['user_type']
        user.save()
        return user
