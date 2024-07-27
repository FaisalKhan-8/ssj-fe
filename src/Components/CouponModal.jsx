import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupons } from "../features/coupons/couponSlice";

const CouponModal = ({
  isOpen,
  onClose,
  couponCode,
  onInputChange,
  onApplyCoupon,
}) => {
  const dispatch = useDispatch();
  const { coupons, status, error } = useSelector((state) => state.coupons);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoupons());
    }
  }, [dispatch, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? "0%" : "100%" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex justify-end z-50"
    >
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-white shadow-lg h-full overflow-auto">
        <div className="p-4 sm:p-6">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none text-xl"
          >
            &times;
          </button>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={onInputChange}
              className="border rounded w-full p-2 mb-4"
            />
            <motion.button
              onClick={() => onApplyCoupon({ code: couponCode })}
              className="bg-orange-500 text-white px-4 py-2 rounded w-full"
              whileHover={{ scale: 1.05, backgroundColor: "#e07b39" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              APPLY
            </motion.button>
          </div>
          <div className="mt-6">
            <h2 className="font-bold mb-4">AVAILABLE COUPONS</h2>
            {coupons.map((item) => {
              const { coupon } = item;
              return (
                <Coupon
                  key={coupon.id}
                  id={coupon.id}
                  code={coupon.code}
                  description={coupon.description}
                  details={`Discount Amount: ${coupon.discount_amount}`}
                  discount_amount={coupon.discount_amount}
                  isUsed={item.is_used}
                  onApplyCoupon={onApplyCoupon}
                />
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Coupon = ({ id, code, description, details, isUsed, onApplyCoupon }) => {
  return (
    <div className="border p-4 mb-4 rounded">
      <div className="flex items-center mb-2">
        <span className="bg-yellow-100 text-yellow-800 p-1 rounded mr-2">
          💡
        </span>
        <span className={`font-bold ${isUsed ? "text-gray-500" : ""}`}>
          {isUsed ? "Already Used" : code}
        </span>
      </div>
      <p className="text-lg font-bold">{description}</p>
      <p className="text-gray-700 text-sm">{details}</p>
      <motion.button
        onClick={() => !isUsed && onApplyCoupon({ code })}
        className={`mt-2 ${
          isUsed
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-transparent border border-orange-500 text-orange-500"
        } px-4 py-2 rounded w-full sm:w-auto`}
        whileHover={!isUsed ? { scale: 1.05, backgroundColor: "#fff5f0" } : {}}
        whileTap={!isUsed ? { scale: 0.95 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
        disabled={isUsed}
      >
        {isUsed ? "" : "APPLY COUPON"}
      </motion.button>
    </div>
  );
};

export default CouponModal;
