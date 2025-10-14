import React, { useEffect, useState } from "react";
import axios from "axios";
import { createIcons, icons } from "lucide";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Basic() {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Side");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [cart, setCart] = useState([]); // ✅ قائمة الطلبات
  const [orderType, setOrderType] = useState("Dine In");

  createIcons({ icons });

  const categoryInfo = {
    Breakfast: { icon: <i data-lucide="egg-fried"></i>, price: 85 },
    Miscellaneous: { icon: <i data-lucide="chef-hat"></i>, price: 50 },
    Starter: { icon: <i data-lucide="nut"></i>, price: 60 },
    Soup: { icon: <i data-lucide="nut"></i>, price: 65 },
    Side: { icon: <i data-lucide="torus"></i>, price: 58 },
    Beef: { icon: <i data-lucide="beef"></i>, price: 120 },
    Lamb: { icon: <i data-lucide="ham"></i>, price: 110 },
    Chicken: { icon: <i data-lucide="drumstick"></i>, price: 90 },
    Seafood: { icon: <i data-lucide="shrimp"></i>, price: 100 },
    Pasta: { icon: <i data-lucide="line-squiggle"></i>, price: 80 },
    Pork: { icon: <i data-lucide="waves"></i>, price: 100 },
    Vegan: { icon: <i data-lucide="vegan"></i>, price: 75 },
    Vegetarian: { icon: <i data-lucide="salad"></i>, price: 70 },
    Dessert: { icon: <i data-lucide="cake-slice"></i>, price: 70 },
    Drink: { icon: <i data-lucide="beer"></i>, price: 55 },
    sandwich: { icon: <i data-lucide="sandwich"></i>, price: 45 },
    Coffee: { icon: <i data-lucide="coffee"></i>, price: 30 },
  };

  useEffect(() => {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
      .then((res) => setCategories(res.data.meals))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    axios
      .get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
      )
      .then((res) => setMeals(res.data.meals))
      .catch((err) => console.error("Error fetching meals:", err));
  }, [selectedCategory]);

  const totalPrice = cart.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="container m-0 ">
      <div className="row flex-nowrap ">
        {/* ✅ Sidebar */}
        <div
          className="bg-light my-2 shadow rounded-4"
          style={{ width: "fit-content", backgroundColor: "#cfe2ff" }}
        >
          <h4 className="text-center my-3">
            Menu <i data-lucide="utensils"></i>
          </h4>

          <ul className="list-group mx-auto">
            {categories.map((cat) => (
              <li
                key={cat.strCategory}
                className={`list-group-item d-flex flex-column justify-content-center align-items-center my-1 rounded-3 py-2 ${
                  selectedCategory === cat.strCategory ? "active" : ""
                }`}
                style={{
                  cursor: "pointer",
                  width: "120px",
                  height: "100px",
                  textAlign: "center",
                }}
                onClick={() => setSelectedCategory(cat.strCategory)}
              >
                <span className="mb-2 fs-4">
                  {categoryInfo[cat.strCategory]?.icon || (
                    <i data-lucide="disc-2"></i>
                  )}
                </span>
                <span>{cat.strCategory}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Meals */}
        <div className="my-0 px-1 mx-1"
         style={{ width: "63%"}}>
          <div className="d-flex flex-wrap gap-2 my-2">
            {meals.map((meal) => (
              <div
                className="card border-0 shadow"
                key={meal.idMeal}
                style={{ width: "12rem", cursor: "pointer" }}
                onClick={() => {
                  setSelectedMeal(meal);
                  setQuantity(1);
                  setComment("");
                }}
              >
                <img
                  src={meal.strMealThumb}
                  className="card-img-top"
                  alt={meal.strMeal}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body text-start">
                  <h5 className="card-title">{meal.strMeal}</h5>
                  <p>
                    <strong>Price:</strong>{" "}
                    {categoryInfo[selectedCategory]?.price || 70} EGP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Cart Sidebar */}
        <div
          className="shadow rounded-4 mt-2 "
          style={{width:"25%" , backgroundColor: "#f8f9fa" }}
        >
          <h4 className="text-center my-3">
            Order Details <i data-lucide="notepad-text"></i>
          </h4>

          {cart.length === 0 ? (
            <p className="text-center text-muted">No items added yet -_- </p>
          ) : (
            <>
              <ul className="list-unstyled">
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="d-flex align-items-center border-bottom py-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded me-2"
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="flex-grow-1 text-start ms-3">
                      <strong>{item.name}</strong>
                      <p className="mb-0 text-muted small">
                        Qty: {item.quantity} × {item.unitPrice} EGP
                      </p>
                      <p className="mb-0">
                        <strong>{item.total} EGP</strong>
                      </p>
                      {item.comment && (
                        <small className="text-secondary">
                          Note: {item.comment}
                        </small>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* ✅ Total Price */}
              <div className="border-top pt-3 my-2 text-start">
                <h6 className="fw-bold text-success fs-5 text-center mb-5">
                  Total: {totalPrice} EGP
                </h6>
              </div>

              {/* ✅ Dine In / Take Away */}
              <div className="mt-3 d-flex">
                <label className="fw-semibold d-block me-3">Order Type:</label>
                <div className="d-flex">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="orderType"
                      id="dineIn"
                      value="Dine In"
                      checked={orderType === "Dine In"}
                      onChange={(e) => setOrderType(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="dineIn">
                      Dine In
                    </label>
                  </div>

                  <div className="form-check ms-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="orderType"
                      id="takeAway"
                      value="Take Away"
                      checked={orderType === "Take Away"}
                      onChange={(e) => setOrderType(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="takeAway">
                      Take Away
                    </label>
                  </div>
                </div>
              </div>

              {/* ✅ Buttons */}
              <div className="mt-4 d-flex flex-column gap-2">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    toast.info("The order has been Saved successfully!", {
                      position: "top-right",
                      autoClose: 2000,
                    });
                  }}
                >
                  Save Bill <i class="bi bi-download fs-5"></i>
                </button>

                <button
                  className="btn btn-success"
                  onClick={() => {
                    toast.success("The order has been sent successfully!", {
                      position: "top-right",
                      autoClose: 2000,
                    });
                  }}
                >
                  Send Process <i className="bi bi-send fs-5"></i>
                </button>

                <button
                  className="btn btn-outline-danger"
                  onClick={() => setCart([])}
                >
                  Clear All Orders <i class="bi bi-trash fs-5"></i>
                </button>
              </div>
            </>
          )}
          <ToastContainer />
        </div>
      </div>

      {/* ✅ Popup */}
      {selectedMeal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelectedMeal(null)}
        >
          <div
            className="card p-4 shadow-lg position-relative"
            style={{
              width: "450px",
              backgroundColor: "white",
              borderRadius: "15px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="btn-close position-absolute top-0 end-0 m-3"
              onClick={() => setSelectedMeal(null)}
            ></button>

            <div className="d-flex align-items-center mb-3">
              <img
                src={selectedMeal.strMealThumb}
                alt={selectedMeal.strMeal}
                className="rounded-3 shadow-sm me-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <div className="text-start">
                <h5 className="mb-2">{selectedMeal.strMeal}</h5>
                <p className="fs-6 mb-0 text-muted">
                  <strong>Unit Price:</strong>{" "}
                  {categoryInfo[selectedCategory]?.price || 70} EGP
                </p>
              </div>
            </div>

            <p className="fs-5 text-success text-center mb-3">
              <strong>Total:</strong>{" "}
              {(categoryInfo[selectedCategory]?.price || 70) * quantity} EGP
            </p>

            <div className="d-flex justify-content-center align-items-center mb-3">
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="fs-5">{quantity}</span>
              <button
                className="btn btn-outline-secondary mx-2"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>

            <textarea
              className="form-control mb-3"
              placeholder="Add a Note..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="d-flex gap-1">
              <button
                className="btn btn-success w-50"
                onClick={() => {
                  const unitPrice = categoryInfo[selectedCategory]?.price || 70;
                  const total = unitPrice * quantity;
                  setCart((prev) => [
                    ...prev,
                    {
                      name: selectedMeal.strMeal,
                      image: selectedMeal.strMealThumb,
                      quantity,
                      unitPrice,
                      total,
                      comment,
                    },
                  ]);
                  setSelectedMeal(null);
                }}
              >
                Add
              </button>

              <button
                className="btn btn-outline-secondary w-50"
                onClick={() => setSelectedMeal(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
