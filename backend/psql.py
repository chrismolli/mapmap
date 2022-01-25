import psycopg2
from threading import Lock

class DBClient:

    conn = None
    cursor = None
    mutex = None

    def __init__(self, **params):
        self.open(**params)
        self.mutex = Lock()
        self.print_version()

    def open(self, **params):
        try:
            print("Establishing database connection...")
            self.conn = psycopg2.connect(**params)
            self.cursor = self.conn.cursor()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)

    def print_version(self):
        if self.cursor != None:
            self.mutex.acquire()
            print("PostgreSQL database version: ")
            self.cursor.execute("SELECT version()")
            print(self.cursor.fetchone())
            self.mutex.release()

    def execute(self, sql):
        self.mutex.acquire()
        try:
            self.cursor.execute(sql)
            self.conn.commit()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
        self.mutex.release()

    def query(self, sql):
        self.mutex.acquire()
        try:
            self.cursor.execute(sql)
            res = self.cursor.fetchall()
        except (Exception, psycopg2.DatabaseError) as error:
            print(error)
            res = None
        self.mutex.release()
        return res

    def close(self):
        self.cursor.close()
        self.conn.close()
        print("Closed database connection.")
