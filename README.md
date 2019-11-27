# HackaTUM2019Server

**Server URL**: https://hackatum2019.herokuapp.com/

<br/>

**API endpoints:**
* **GET** https://hackatum2019.herokuapp.com/
* **GET** https://hackatum2019.herokuapp.com/repository/test
* **GET** https://hackatum2019.herokuapp.com/repository/test/commit/test
* **GET**/**PUT** https://hackatum2019.herokuapp.com/repository/test/commit/test/file/text.txt
  * Required body data (form-data) for **PUT**: user_id

Data fetching method used by the frontend:
* **GET** https://hackatum2019.herokuapp.com/fetchall
