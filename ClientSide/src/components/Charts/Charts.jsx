import React, { useContext, useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { Context } from "../../Redux/Context";

function Charts() {
  const { allOrders } = useContext(Context);

  const [monthlyOrders, setMonthlyOrders] = useState(Array(12).fill(0));
  const [monthlyProfits, setMonthlyProfits] = useState(Array(12).fill(0));

  const [orderStatusAnalytics, setOrderStatusAnalytics] = useState({
    Order_Placed: 0,
    Processing: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
  });

  useEffect(() => {
    const analytics = {
      Order_Placed: 0,
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0,
    };
    const monthlyOrderCounts = Array(12).fill(0);
    const monthlyProfitTotals = Array(12).fill(0);

    allOrders?.forEach((order) => {
      switch (order?.status) {
        case "Order Placed":
          analytics.Order_Placed += 1;
          break;
        case "Processing":
          analytics.Processing += 1;
          break;
        case "Shipped":
          analytics.Shipped += 1;
          break;
        case "Delivered":
          analytics.Delivered += 1;
          break;
        case "Cancelled":
          analytics.Cancelled += 1;
          break;
        default:
          break;
      }

      // Monthly orders analytics
      const orderDate = new Date(order.date_added);
      const month = orderDate.getMonth(); // getMonth() returns 0 for January, 1 for February, etc.
      monthlyOrderCounts[month] += 1;

      // count profit
      monthlyProfitTotals[month] += order?.bill?.totalAmount * 0.6;
    });

    setOrderStatusAnalytics(analytics);
    setMonthlyOrders(monthlyOrderCounts);
    setMonthlyProfits(monthlyProfitTotals);
  }, [allOrders]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Des",
  ];
  return (
    <div className="flex gap-[2rem] flex-col">
      <div className="w-full flex gap-[2rem]">
        <div className="flex flex-col items-center justify-center bg-white w-fit">
          <h2 className="mt-[1rem] text-[1.4rem] text-black/70 font-semibold">
            Orders
          </h2>

          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: months,
              },
            ]}
            series={[{ data: monthlyOrders }]}
            width={700}
            height={350}
            borderRadius={5}
          />
        </div>
        <div className="flex flex-col pr-[2rem]  justify-center w-full bg-white">
          <h2 className="mt-[1rem] text-center text-[1.4rem] text-black/70 font-semibold">
            Orders Status
          </h2>
          <PieChart
            series={[
              {
                arcLabel: (item) => item?.value,
                arcLabelMinAngle: 45,
                paddingAngle: 1,
                innerRadius: 0,
                outerRadius: 80,

                data: [
                  {
                    id: 0,
                    value: orderStatusAnalytics?.Order_Placed,
                    label: "Order Placed",
                  },
                  {
                    id: 1,
                    value: orderStatusAnalytics?.Processing,
                    label: "Processing",
                  },
                  {
                    id: 2,
                    value: orderStatusAnalytics?.Shipped,
                    label: "Shipped",
                  },
                  {
                    id: 3,
                    value: orderStatusAnalytics?.Delivered,
                    label: "Delivered",
                  },
                  {
                    id: 4,
                    value: orderStatusAnalytics?.Cancelled,
                    label: "Cancelled",
                  },
                ],
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontSize: 14,
                fontWeight: 600,
              },
            }}
            width={450}
            height={300}
          />
        </div>
      </div>
      <div className="flex items-center justify-center bg-white w-fit">
        <LineChart
          xAxis={[
            {
              scaleType: "point",
              data: months,
            },
          ]}
          series={[
            {
              label: "Profit",
              data: monthlyProfits,
              area: true,
            },
          ]}
          width={1228}
          height={300}
        />
      </div>
    </div>
  );
}

export default Charts;
