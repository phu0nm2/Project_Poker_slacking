import React, { useState } from "react";
import Game from "../Game";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";

// Sử dụng useCallback trong React bọc tất cả các function ngăn hàm con render lại khi isGameStarted
//================================================================
// REACT HOOK
// formik: thư viện xử lý form
// yup: xử lý validation form
const schema = yup.object().shape({
  // shape: hình dáng của form
  username: yup.string().required("This is required"),
  email: yup.string().required("This is required").email("Email is invalid"),
  phone: yup
    .string()
    .required("This is required")
    .matches(/^[0-9]+$/g),
});

const Home = () => {
  // useState trong react hook khi nhấn start thì component render lại
  const [isGameStarted, setIsGameStarted] = useState(false);

  // Bóc tách các hàm có sẵn trong formik
  const {
    handleChange,
    values,
    errors,
    touched,
    handleBlur,
    setTouched,
    isValid,
    // setFieldTouched,
  } = useFormik({
    initialValues: {
      // setDefault
      username: "Tai",
      email: "A@gmail.com",
      phone: "1233213",
    },

    validationSchema: schema,

    validateOnMount: true, // check validation khi vừa vào
  });

  //================================================================
  // Trước khi submit thì dispatch action lên store
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Cách 1: Tự xây dựng
    // const setAllTouched = () => {
    //   Object.keys(values).forEach((key) => {
    //     setFieldTouched(key);
    //   });
    // };

    // Cách 2: setTouched duyệt key và set lại values
    setTouched({
      username: true,
      email: true,
      phone: true,
    });

    if (!isValid) return; // Nếu chưa đăng nhập thì k cho vô

    const newPlayer = {
      ...values,
      totalPoint: 25000,
      cards: [],
    };

    dispatch({
      type: "ADD_PLAYER",
      payload: newPlayer,
    });

    setIsGameStarted(true); // set lại state
  };

  return (
    <>
      {isGameStarted ? (
        <Game />
      ) : (
        <div
          className="text-center"
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1 className="diplay-4 mb-5"> Welcome to Pocker Center</h1>
          <h3>Fill your info and start</h3>
          <form onSubmit={handleSubmit} className="w-25 mx-auto">
            <input
              value={values.username} // gán values đẩy setDefault lên form
              name="username"
              onChange={handleChange}
              onBlur={handleBlur}
              type="input"
              placeholder="username"
              className="w-100 form-control mb-3"
            />
            {/* touched: ktra hành động trên thẻ input, nếu click vào thì show thông báo */}
            {touched.username ? (
              <p className="text-danger">{errors.username}</p>
            ) : null}

            <input
              value={values.email}
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              type="input"
              placeholder="email"
              className="w-100 form-control mb-3"
            />

            {touched.email && <p className="text-danger">{errors.email}</p>}

            <input
              value={values.phone}
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              type="input"
              placeholder="phone"
              className="w-100 form-control mb-3"
            />

            {touched.phone && <p className="text-danger">{errors.phone}</p>}

            <button className="btn btn-success">Start new Game</button>
          </form>
        </div>
      )}
    </>
  );
};

export default Home;
