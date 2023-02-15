from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_protect
import os
from . import utils
import json
# Create your views here.


def index(request):
    return render(request, 'main/index.html')

@csrf_protect
def upload_pdf(request):
    if request.method == 'POST':
        pdf_file = request.FILES['pdf_file']
        path = os.path.join(settings.MEDIA_ROOT, pdf_file.name)
        with open(path, 'wb') as f:
            f.write(pdf_file.read())
        data = utils.get_info(path)
    return JsonResponse(data, safe=False)

def directory(request):
    return render(request, 'main/directory.html')