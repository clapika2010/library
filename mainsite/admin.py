from django.contrib import admin
from library.mainsite.models import *

admin.site.register(Ebook, EbookAdmin)
admin.site.register(Category)
admin.site.register(Subject)
admin.site.register(UserInfo)
