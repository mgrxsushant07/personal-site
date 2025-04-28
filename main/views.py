from django.shortcuts import render, redirect
from django.contrib import messages
from .models import ContactForm
from .forms import ContactFormForm



# Create your views here.


def index(request):
    if request.method == 'POST':
        form = ContactFormForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('/#contact')
    else:
        form = ContactFormForm()

    return render(request, 'index.html', {'form': form})
