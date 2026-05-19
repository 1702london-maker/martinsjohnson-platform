export default function Loading() {
  return (
    <div style={{ paddingTop: '5rem', background: '#F3F1EC', minHeight: '100vh' }}>
      <div style={{ background: '#EBEBEA' }} className="py-16 px-6">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="h-3 w-24 rounded" style={{ background: '#D5D3CE', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <div className="h-12 w-80 rounded" style={{ background: '#D5D3CE', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <div className="h-4 w-96 rounded" style={{ background: '#E2E0DB', animation: 'pulse 1.5s ease-in-out infinite' }} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i}>
              <div className="aspect-square mb-4 rounded" style={{ background: '#EBEBEA', animation: 'pulse 1.5s ease-in-out infinite', animationDelay: `${i * 0.1}s` }} />
              <div className="h-2.5 w-16 mb-2 rounded" style={{ background: '#D5D3CE', animation: 'pulse 1.5s ease-in-out infinite' }} />
              <div className="h-4 w-40 mb-1 rounded" style={{ background: '#D5D3CE', animation: 'pulse 1.5s ease-in-out infinite' }} />
              <div className="h-3 w-16 rounded" style={{ background: '#E2E0DB', animation: 'pulse 1.5s ease-in-out infinite' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
