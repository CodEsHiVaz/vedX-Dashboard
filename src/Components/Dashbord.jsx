import React, { useState, useEffect } from "react";
import styles from "./Dashbord.module.css";
const Dashbord = () => {
  const [users, SetUsers] = useState([]);
  const [loder, setloder] = useState(false);
  useEffect(() => {
    getData().then((res) => {
      const newarr = res.map((elem) => elem);
      SetUsers([...newarr]);
    });
  }, []);
  const getData = async () => {
    setloder(true);
    const res = await fetch(
      `https://my-json-server.typicode.com/Ved-X/assignment/orders`
    );
    const data = await res.json();

    for (let i = 0; i < data.length; i++) {
      data[i].date2 = converdate(data[i].date);
    }
    setloder(false);
    return data;
  };
  const getSearchResults = async (e) => {
    setloder(true);
    const param = e.target.value;
    const res = await fetch(
      `https://my-json-server.typicode.com/Ved-X/assignment/orders/?customer_like=${param}`
    );
    const data = await res.json();
    SetUsers([...data]);
    setloder(false);
  };
  const filterHandler = (param) => {
    getData().then((res) => {
      const newarr = res.filter((elem) => elem.status === param);

      SetUsers([...newarr]);
    });
  };
  const sortHandler = (params) => {
    getData().then((res) => {
      const newarr = res.map((elem) => elem);
      SetUsers([...newarr]);
    });
    if (params.length) {
      const nedData =
        params === "Asecnding"
          ? users.sort((a, b) => +a.date2 - +b.date2)
          : users.sort((a, b) => +b.date2 - +a.date2);
      SetUsers([...nedData]);
    }
  };

  const converdate = (dateString) => {
    const dateParts = dateString.split("/");
    return new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searcnFilterbox}>
        <div>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => getSearchResults(e)}
          />

          <h2>{users.length} records Found</h2>
        </div>
        <div>
          <div>
            <select
              name="Sort By"
              id="sortbyeorderdate"
              defaultValue={"selected"}
              onChange={(e) => sortHandler(e.target.value)}
            >
              <option disabled value={"selected"}>
                Sort by Order Date{" "}
              </option>
              <option value="Asecnding">Asecnding </option>
              <option value="Desecnding">Desecnding</option>
            </select>
          </div>
          <div>
            <select
              name=""
              id="filterbystatus"
              defaultValue="selected"
              onChange={(e) => filterHandler(e.target.value)}
            >
              <option value="selected" disabled>
                Filter By Order Status
              </option>
              <option value="Prepared">Prepared</option>
              <option value="Completed">Completed</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        {!loder ? (
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>OrderId</td>
                <td>Customer</td>
                <td>Address</td>
                <td>Product</td>
                <td>Order date</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {users.length &&
                users.map((elem, index) => {
                  return (
                    <tr key={elem.order_id}>
                      <td>{index + 1}</td>
                      <td>{elem.order_id}</td>
                      <td>{elem.customer}</td>
                      <td>{elem.address}</td>
                      <td>{elem.product_title}</td>
                      <td>{elem.date}</td>
                      <td
                        className={
                          (elem.status === "Completed" && styles.completed) ||
                          (elem.status === "Delivered" && styles.deliverd) ||
                          (elem.status === "Prepared" && styles.prepared) ||
                          (elem.status === "Prepone" && styles.prepared)
                        }
                      >
                        {elem.status}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          <img
            src="https://freefrontend.com/assets/img/css-loaders/daily-ui-20-css-loader.gif"
            alt="loder"
          ></img>
        )}
        <div> {!users.length && <h2> No data to show</h2>}</div>
      </div>
    </div>
  );
};

export default Dashbord;
