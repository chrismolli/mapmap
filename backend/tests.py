import pytest
import unittest

@pytest.fixture(scope="class")
def db_class(request):
    class DummyDB:
        pass

    # set a class attribute on the invoking test context
    request.cls.db = DummyDB()

@pytest.mark.usefixtures("db_class")
class MyTest(unittest.TestCase):

    def test_method1(self):
        assert hasattr(self, "db")

    def test_method2(self):
        assert 0, self.db  # fail for demo purposes