import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from 'recharts'

type ChartData = {
  name: string
  attendance: number
}

const data: ChartData[] = [
  { name: 'Jan', attendance: 85 },
  { name: 'Feb', attendance: 90 },
  { name: 'Mar', attendance: 78 },
  { name: 'May', attendance: 88 },
  { name: 'Jun', attendance: 92 },
  { name: 'Jul', attendance: 81 },
]

export function AttendanceTrendChart() {
  return (
    <div className="w-full h-96  bg-white py-6 rounded-xl shadow-sm flex flex-col">
      {/* Header part is here  */}
      <div className="flex justify-between items-center px-5 pb-4">
        <div>
          <h1 className="text-2xl font-semibold text-[#0F172A]">Academic Overview</h1>
          <p className="text-sm text-[#64748B]">Monthly average student attendance (%)</p>
        </div>
        <div>
          <button className="text-sm bg-[#F8FAFC] text-[#475569] px-3 py-2 rounded-xl">
            Last 6 Months
          </button>
        </div>
      </div>

      {/* Chart Area is here */}
      <div className="flex-1 ">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
            {/* This is the for the shadow effect in the chart*/}
            <defs>
              <filter id="attendanceLineShadow" height="200%">
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="4"
                  floodColor="#4F46E5"
                  floodOpacity="0.3"
                />
              </filter>
            </defs>

            <CartesianGrid vertical={false} stroke="#E2E8F0" />

            <XAxis
              dataKey="name"
              tick={{ fill: '#64748B', fontSize: 12 }}
              tickMargin={20}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#64748B', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
            />

            <Tooltip
              formatter={(value, name) => [`${value}%`, name]}
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              }}
              labelStyle={{ color: '#64748B', fontWeight: 500 }}
            />

            <Line
              type="monotone"
              dataKey="attendance"
              stroke="#0B3D93"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              style={{ filter: 'url(#attendanceLineShadow)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
