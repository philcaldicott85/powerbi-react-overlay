import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import './App.css'

const monthlyPerformance = [
  { month: 'Jan', revenue: 36500, costs: 27400, profit: 9100 },
  { month: 'Feb', revenue: 39200, costs: 28600, profit: 10600 },
  { month: 'Mar', revenue: 41800, costs: 30900, profit: 10900 },
  { month: 'Apr', revenue: 37400, costs: 28100, profit: 9300 },
  { month: 'May', revenue: 44600, costs: 32100, profit: 12500 },
  { month: 'Jun', revenue: 47200, costs: 33800, profit: 13400 },
  { month: 'Jul', revenue: 49300, costs: 34600, profit: 14700 },
  { month: 'Aug', revenue: 51500, costs: 36100, profit: 15400 },
  { month: 'Sep', revenue: 48200, costs: 35200, profit: 13000 },
  { month: 'Oct', revenue: 54600, costs: 37900, profit: 16700 },
  { month: 'Nov', revenue: 57100, costs: 39600, profit: 17500 },
  { month: 'Dec', revenue: 61300, costs: 41800, profit: 19500 },
]

const outstandingInvoices = [
  { age: 'Current', value: 28400 },
  { age: '1–30 days', value: 19600 },
  { age: '31–60 days', value: 11200 },
  { age: '61–90 days', value: 6300 },
  { age: '90+ days', value: 4100 },
]

const customers = [
  {
    name: 'West Midlands Developments',
    revenue: 78200,
    outstanding: 12400,
    status: 'On track',
  },
  {
    name: 'Central Retail Group',
    revenue: 64900,
    outstanding: 8900,
    status: 'On track',
  },
  {
    name: 'Northfield Construction',
    revenue: 53800,
    outstanding: 16700,
    status: 'Overdue',
  },
  {
    name: 'Arden Property Services',
    revenue: 47200,
    outstanding: 5200,
    status: 'On track',
  },
  {
    name: 'Beacon Commercial',
    revenue: 41600,
    outstanding: 9800,
    status: 'Due soon',
  },
]

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value)
}

function App() {
  const [selectedCompany, setSelectedCompany] = useState('All companies')
  const [selectedPeriod, setSelectedPeriod] = useState('This year')
  const [lastUpdated, setLastUpdated] = useState('Just now')

  function refreshData() {
    setLastUpdated(new Date().toLocaleTimeString('en-GB'))
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <div className="brand-mark">P</div>

          <div>
            <h1>Finance Analytics</h1>
            <p>Custom reporting workspace</p>
          </div>
        </div>

        <div className="user-area">
          <span>Phil Caldicott</span>
          <div className="avatar">PC</div>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <nav>
            <button className="nav-item active">Overview</button>
            <button className="nav-item">Profit &amp; Loss</button>
            <button className="nav-item">Invoices</button>
            <button className="nav-item">Estimates</button>
            <button className="nav-item">Jobs</button>
            <button className="nav-item">Cash Flow</button>
          </nav>

          <div className="sidebar-footer">
            <button className="nav-item">Settings</button>
          </div>
        </aside>

        <main className="main-content">
          <section className="page-heading">
            <div>
              <h2>Business Overview</h2>
              <p>
                Financial and operational performance · Updated {lastUpdated}
              </p>
            </div>

            <button
              type="button"
              className="primary-button"
              onClick={refreshData}
            >
              Refresh data
            </button>
          </section>

          <section className="filter-bar">
            <label>
              Company
              <select
                value={selectedCompany}
                onChange={(event) => setSelectedCompany(event.target.value)}
              >
                <option>All companies</option>
                <option>Ceilings by Design</option>
                <option>Company Two</option>
              </select>
            </label>

            <label>
              Reporting period
              <select
                value={selectedPeriod}
                onChange={(event) => setSelectedPeriod(event.target.value)}
              >
                <option>This month</option>
                <option>Last month</option>
                <option>This quarter</option>
                <option>This year</option>
              </select>
            </label>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setSelectedCompany('All companies')
                setSelectedPeriod('This year')
              }}
            >
              Clear filters
            </button>
          </section>

          <section className="selection-summary">
            Showing <strong>{selectedCompany}</strong> for{' '}
            <strong>{selectedPeriod.toLowerCase()}</strong>
          </section>

          <section className="kpi-grid">
            <article className="kpi-card">
              <span>Revenue</span>
              <strong>{formatCurrency(529700)}</strong>
              <small className="positive">▲ 8.4% against prior period</small>
            </article>

            <article className="kpi-card">
              <span>Gross profit</span>
              <strong>{formatCurrency(157600)}</strong>
              <small className="positive">▲ 5.7% against prior period</small>
            </article>

            <article className="kpi-card">
              <span>Outstanding invoices</span>
              <strong>{formatCurrency(69600)}</strong>
              <small>38 open customer invoices</small>
            </article>

            <article className="kpi-card">
              <span>Net margin</span>
              <strong>18.7%</strong>
              <small className="negative">▼ 1.2% against target</small>
            </article>
          </section>

          <section className="dashboard-grid">
            <article className="dashboard-card dashboard-card-wide">
              <div className="card-heading">
                <div>
                  <h3>Revenue and operating costs</h3>
                  <p>Monthly financial performance</p>
                </div>

                <button type="button" className="card-action">
                  View details
                </button>
              </div>

              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `£${value / 1000}k`} />
                    <Tooltip
                      formatter={(value) =>
                        formatCurrency(Number(value))
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="revenue"
                      name="Revenue"
                      fill="#176b87"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="costs"
                      name="Operating costs"
                      fill="#9caab4"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="dashboard-card">
              <div className="card-heading">
                <div>
                  <h3>Aged debt</h3>
                  <p>Outstanding customer invoices</p>
                </div>
              </div>

              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={outstandingInvoices}
                    layout="vertical"
                    margin={{ left: 15 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis
                      type="number"
                      tickFormatter={(value) => `£${value / 1000}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="age"
                      width={85}
                    />
                    <Tooltip
                      formatter={(value) =>
                        formatCurrency(Number(value))
                      }
                    />
                    <Bar
                      dataKey="value"
                      name="Outstanding"
                      fill="#d97706"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="dashboard-card dashboard-card-wide">
              <div className="card-heading">
                <div>
                  <h3>Monthly gross profit</h3>
                  <p>Profit trend across the selected period</p>
                </div>
              </div>

              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `£${value / 1000}k`} />
                    <Tooltip
                      formatter={(value) =>
                        formatCurrency(Number(value))
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      name="Gross profit"
                      stroke="#107c10"
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </article>

            <article className="dashboard-card">
              <div className="card-heading">
                <div>
                  <h3>Payment position</h3>
                  <p>Current accounts receivable</p>
                </div>
              </div>

              <div className="payment-summary">
                <div>
                  <span>Paid on time</span>
                  <strong>72%</strong>
                </div>

                <div>
                  <span>Due within 14 days</span>
                  <strong>18%</strong>
                </div>

                <div>
                  <span>Overdue</span>
                  <strong>10%</strong>
                </div>
              </div>
            </article>
          </section>

          <section className="table-card">
            <div className="card-heading">
              <div>
                <h3>Top customers</h3>
                <p>Revenue and outstanding balances</p>
              </div>

              <button type="button" className="card-action">
                View all customers
              </button>
            </div>

            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Revenue</th>
                    <th>Outstanding</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.name}>
                      <td>{customer.name}</td>
                      <td>{formatCurrency(customer.revenue)}</td>
                      <td>{formatCurrency(customer.outstanding)}</td>
                      <td>
                        <span
                          className={`status-badge ${customer.status
                            .toLowerCase()
                            .replace(' ', '-')}`}
                        >
                          {customer.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App