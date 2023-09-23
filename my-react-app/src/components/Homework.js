import React, { useState, useEffect } from 'react';
import fetch from './data';

function calcPoints(transaction) {
  let points = 0;
  const Spent = transaction.amt - 100;

  if (Spent > 0) {
    points += Spent * 2;
  }
  if (transaction.amt > 50 && transaction.amt > 100) {
    points += 50;
  }

  return points;
}

function organizeData(transactions) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const cust = {};
  transactions.forEach((t) => {
    const points = calcPoints(t);
    const month = new Date(t.transactionDt).getMonth();
    const { custid, name } = t;

    if (!cust[custid]) {
      cust[custid] = [];
    }

    if (cust[custid][month]) {
      cust[custid][month].points += points;
      cust[custid][month].numTrans++;
    } else {
      cust[custid][month] = {
        custid,
        name,
        monthNumber: month,
        month: months[month],
        numTrans: 1,
        points,
      };
    }
  });

  return cust;
}

function calcTotalPoints(cust) {
  const total = {};

  for (const custKey in cust) {
    cust[custKey].forEach((c) => {
      const { name, points } = c;
      if (!total[name]) {
        total[name] = 0;
      }
      total[name] += points;
    });
  }

  return total;
}

export default function Homework() {
  const [tData, settData] = useState(null);

  useEffect(() => {
    fetch().then((data) => {
      const cust = organizeData(data);
      const total = calcTotalPoints(cust);

      settData({
        summarycust: Object.values(cust).flat(),
        total: Object.entries(total).map(([name, points]) => ({ name, points })),
      });
    });
  }, []);

  return (
    <div className="app-container">
      <h1>REWARD POINTS</h1>
      {tData == null ? (
        ''
      ) : (
        <div>
          <h2>Reward Points Earned Per Month</h2>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Custid</th>
                <th>Month</th>
                <th>No.Month</th>
                <th>Name</th>
                <th>No.of.Trans</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {tData.summarycust.map((item, index) => (
                <tr key={index}>
                  <td>{item.custid}</td>
                  <td>{item.month}</td>
                  <td>{item.monthNumber}</td>
                  <td>{item.name}</td>
                  <td>{item.numTrans}</td>
                  <td>{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Total Reward Points</h2>
          <table className="customer-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {tData.total.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}