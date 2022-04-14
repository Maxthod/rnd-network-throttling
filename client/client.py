from concurrent.futures import Executor, ThreadPoolExecutor
import requests
import sys
url ="http://localhost:3000"
id = "allo"
total = 1000

def post():
    return requests.post(f'{url}', json={
        'id': id,
        'total': total
    })

def get():
    return requests.get(f'{url}/{id}')

def delete():
    return requests.put(f'{url}', json={
        'id': id,
    })

p = post()
with ThreadPoolExecutor() as executor:
    futures = []
    for x in range(total):
        future = executor.submit(get)
        futures.append(future)
    for future in futures:
        result = future.result()
        print(result.text)
    finish = delete()
    print(finish.text)  
