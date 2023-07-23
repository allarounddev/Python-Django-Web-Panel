import django_tables2 as tables
import models as Person

class PersonTable(tables.Table):
    class Meta:
        model = Person
        sequence = ("last_name", "first_name", "birth_date", )
        exclude = ("user", )

