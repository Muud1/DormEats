"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  id: number;
  restaurant: string;
  dorm: string;
  organizer?: string;
  joined: number;
  maxPeople: number | string;
  closesIn?: string;
  closeTime?: string;
  deliveryFee: string;
  trustScore: number;
};

const defaultOrders: Order[] = [
  {
    id: 1,
    restaurant: "Chipotle",
    dorm: "North Hall",
    organizer: "Alex",
    joined: 3,
    maxPeople: 5,
    closesIn: "12 min",
    deliveryFee: "$2.40 each",
    trustScore: 8,
  },
  {
    id: 2,
    restaurant: "Thai Garden",
    dorm: "West Hall",
    organizer: "Maya",
    joined: 2,
    maxPeople: 4,
    closesIn: "25 min",
    deliveryFee: "$3.10 each",
    trustScore: 12,
  },
  {
    id: 3,
    restaurant: "Panda Express",
    dorm: "South Hall",
    organizer: "Jordan",
    joined: 4,
    maxPeople: 6,
    closesIn: "8 min",
    deliveryFee: "$1.90 each",
    trustScore: 5,
  },
];

export default function Home() {
  const [orders, setOrders] = useState<Order[]>(defaultOrders);
  const [joinedOrders, setJoinedOrders] = useState<number[]>([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("dormeats-orders") || "[]",
    );

    const savedJoinedOrders = JSON.parse(
      localStorage.getItem("dormeats-joined-orders") || "[]",
    );

    setOrders([...savedOrders, ...defaultOrders]);
    setJoinedOrders(savedJoinedOrders);
  }, []);

  function handleJoin(orderId: number) {
    const orderToJoin = orders.find((order) => order.id === orderId);

    if (!orderToJoin) return;

    if (joinedOrders.includes(orderId)) {
      alert("You already joined this order.");
      return;
    }

    if (Number(orderToJoin.joined) >= Number(orderToJoin.maxPeople)) {
      alert("This order is already full.");
      return;
    }

    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? {
            ...order,
            joined: Number(order.joined) + 1,
          }
        : order,
    );

    const updatedJoinedOrders = [...joinedOrders, orderId];

    setOrders(updatedOrders);
    setJoinedOrders(updatedJoinedOrders);

    const userCreatedOrders = updatedOrders.filter(
      (order) =>
        !defaultOrders.some((defaultOrder) => defaultOrder.id === order.id),
    );

    localStorage.setItem("dormeats-orders", JSON.stringify(userCreatedOrders));
    localStorage.setItem(
      "dormeats-joined-orders",
      JSON.stringify(updatedJoinedOrders),
    );
  }

  function clearDemoOrders() {
    localStorage.removeItem("dormeats-orders");
    localStorage.removeItem("dormeats-joined-orders");
    setOrders(defaultOrders);
    setJoinedOrders([]);
  }

  const totalStudents = orders.reduce(
    (total, order) => total + Number(order.joined),
    0,
  );

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <nav className="mb-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold">DormEats</h1>

          <div className="flex gap-3">
            <button className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200">
              Sign In
            </button>

            <Link
              href="/orders/new"
              className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
            >
              Post Order
            </Link>
          </div>
        </nav>

        <div className="grid gap-10 md:grid-cols-[1fr_420px] md:items-start">
          <section>
            <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-orange-400">
              Dorm food delivery, coordinated
            </p>

            <h2 className="text-5xl font-bold tracking-tight md:text-6xl">
              Split delivery fees with students in your dorm.
            </h2>

            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              DormEats lets college students post food orders, join nearby dorm
              deliveries, split fees, and build reliability through trust
              scores.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#active-orders"
                className="rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
              >
                Browse Active Orders
              </a>

              <Link
                href="/orders/new"
                className="rounded-full border border-slate-600 px-6 py-3 font-semibold text-slate-200 hover:bg-slate-900"
              >
                Create an Order
              </Link>
            </div>

            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-3xl font-bold">{orders.length}</p>
                <p className="mt-1 text-sm text-slate-400">Active orders</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-3xl font-bold">$7.40</p>
                <p className="mt-1 text-sm text-slate-400">Fees split today</p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
                <p className="text-3xl font-bold">{totalStudents}</p>
                <p className="mt-1 text-sm text-slate-400">Students joined</p>
              </div>
            </div>

            <button
              onClick={clearDemoOrders}
              className="mt-6 text-sm text-slate-500 hover:text-slate-300"
            >
              Reset demo data
            </button>
          </section>

          <section
            id="active-orders"
            className="rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-2xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Active Orders</h3>
              <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
                Live
              </span>
            </div>

            <div className="space-y-4">
              {orders.map((order) => {
                const isJoined = joinedOrders.includes(order.id);
                const isFull = Number(order.joined) >= Number(order.maxPeople);

                return (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-lg font-semibold">
                          {order.restaurant}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {order.dorm} · Organized by{" "}
                          {order.organizer || "You"}
                        </p>
                      </div>

                      <span className="rounded-full bg-orange-500/10 px-3 py-1 text-sm text-orange-400">
                        {order.closesIn || `Closes at ${order.closeTime}`}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-slate-300">
                      <span>
                        {order.joined}/{order.maxPeople} joined
                      </span>
                      <span>
                        {String(order.deliveryFee).startsWith("$")
                          ? order.deliveryFee
                          : `$${order.deliveryFee} total`}
                      </span>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        Trust score: {order.trustScore}
                      </span>

                      <button
                        onClick={() => handleJoin(order.id)}
                        disabled={isJoined || isFull}
                        className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-slate-200 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                      >
                        {isFull ? "Full" : isJoined ? "Joined" : "Join"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}