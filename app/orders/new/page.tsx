"use client";

import Link from "next/link";
import { useState } from "react";

type SavedOrder = {
  id: number;
  restaurant: string;
  dorm: string;
  deliveryFee: string;
  maxPeople: string;
  closeTime: string;
  notes: string;
  joined: number;
  trustScore: number;
};

const timeOptions = [
  "5 min",
  "10 min",
  "15 min",
  "20 min",
  "30 min",
  "45 min",
  "1 hour",
  "1.5 hours",
];

export default function NewOrderPage() {
  const [restaurant, setRestaurant] = useState("");
  const [dorm, setDorm] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [notes, setNotes] = useState("");
  const [created, setCreated] = useState(false);
  const [showTimePopup, setShowTimePopup] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!closeTime) {
      alert("Choose a close time before creating the order.");
      return;
    }

    const newOrder: SavedOrder = {
      id: Date.now(),
      restaurant,
      dorm,
      deliveryFee,
      maxPeople,
      closeTime,
      notes,
      joined: 1,
      trustScore: 0,
    };

    const existingOrders = JSON.parse(
      localStorage.getItem("dormeats-orders") || "[]",
    );

    localStorage.setItem(
      "dormeats-orders",
      JSON.stringify([newOrder, ...existingOrders]),
    );

    setCreated(true);
  }

  function chooseTime(time: string) {
    setCloseTime(time);
    setShowTimePopup(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl">
        <Link href="/" className="text-sm text-slate-400 hover:text-white">
          ← Back to home
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-orange-400">
            Create order
          </p>

          <h1 className="text-3xl font-bold">Post a dorm delivery order</h1>

          <p className="mt-3 text-slate-400">
            Let students in your dorm join before the order closes.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Restaurant
              </label>
              <input
                type="text"
                value={restaurant}
                onChange={(event) => setRestaurant(event.target.value)}
                placeholder="Chipotle"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Dorm</label>
              <input
                type="text"
                value={dorm}
                onChange={(event) => setDorm(event.target.value)}
                placeholder="North Hall"
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-orange-500"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Delivery fee
                </label>
                <input
                  type="number"
                  value={deliveryFee}
                  onChange={(event) => setDeliveryFee(event.target.value)}
                  placeholder="6.99"
                  min="0"
                  step="0.01"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Max people
                </label>
                <input
                  type="number"
                  value={maxPeople}
                  onChange={(event) => setMaxPeople(event.target.value)}
                  placeholder="5"
                  min="2"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Close time
              </label>

              <button
                type="button"
                onClick={() => setShowTimePopup(true)}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-left text-white outline-none hover:border-orange-500"
              >
                {closeTime || "Choose Close Time"}
              </button>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Notes</label>
              <textarea
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Ordering at 7:30. Meet in lobby."
                className="min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-orange-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600"
            >
              Create Order
            </button>
          </form>

          {created && (
            <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-4">
              <p className="font-semibold text-green-400">Order saved</p>
              <p className="mt-2 text-sm text-slate-300">
                Your order was saved locally. Go back home to see it in the
                active orders list.
              </p>

              <Link
                href="/"
                className="mt-4 inline-block rounded-full bg-green-500 px-5 py-2 text-sm font-semibold text-slate-950"
              >
                View Active Orders
              </Link>
            </div>
          )}
        </div>
      </section>

      {showTimePopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Choose close time</h2>
                <p className="mt-1 text-sm text-slate-400">
                  How long should students have to join?
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowTimePopup(false)}
                className="rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300 hover:bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {timeOptions.map((time) => (
                <button
                  key={time}
                  type="button"
                  onClick={() => chooseTime(time)}
                  className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:border-orange-500 hover:bg-orange-500"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}