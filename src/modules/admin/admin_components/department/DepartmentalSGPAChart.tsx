type DepartmentalSGPAProp = {
  name: string
  value: number
  color: string
}

const departments: DepartmentalSGPAProp[] = [
  { name: 'Computer Science', value: 8.4, color: '#0B3D93' },
  { name: 'Electronics (ECE)', value: 7.9, color: '#6366F1' },
  { name: 'Civil Engineering', value: 7.2, color: '#14B8A6' },
  { name: 'Mechanical', value: 7.5, color: '#FB923C' },
  { name: 'Electrical', value: 8.1, color: '#60A5FA' },
]

export function DepartmentalSGPAChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full max-w-md">
      <h2 className="text-2xl font-semibold text-[#0F172A]">Departmental SGPA</h2>
      <p className="text-sm text-[#64748B] mb-5">Average Performance</p>

      <div className="space-y-5">
        {departments.map((dept) => (
          <div key={dept.name}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[#64748B]">{dept.name}</span>
              <span className="text-[#64748B]">{dept.value.toFixed(1)}</span>
            </div>

            <div className="w-full h-2.5 bg-[#64748B] rounded-full overflow-hidden">
              {/*Background*/}
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out cursor-pointer`}
                style={{
                  width: `${(dept.value / 10) * 100}%`,
                  backgroundColor: dept.color,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
