from allauth.account.forms import SignupForm
from django import forms

class CustomSignupForm(SignupForm):
    realname = forms.CharField(max_length=20, required=False)
    user_type = forms.CharField(max_length=15, required=False)
    phone_number = forms.CharField(max_length=20, required=False)
    birth = forms.CharField(max_length=20, required=False)
    student_number = forms.CharField(max_length=20, required=False)
    def save(self, request):
        user = super(CustomSignupForm, self).save(request)
        user.realname = self.cleaned_data['realname']
        user.user_type = self.cleaned_data['user_type']
        user.phone_number = self.cleaned_data['phone_number']
        user.student_number = self.cleaned_data['student_number']
        user.birth = self.cleaned_data['birth']
        user.save()
        return user
