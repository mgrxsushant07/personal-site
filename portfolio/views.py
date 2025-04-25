from django.shortcuts import render, redirect 
from django.contrib import messages  # Import messages framework
from .forms import ContactForm

def home(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your message has been sent successfully!")  # Set message
            return redirect('{}?submitted=true'.format(request.path))

    else:
        form = ContactForm()
    return render(request, 'index.html', {'form': form})

