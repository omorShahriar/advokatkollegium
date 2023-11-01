import Link from 'next/link'

export function PreviewBanner() {
  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-black py-2 text-center text-white">
      <Link className="ml-2 underline transition hover:opacity-50" href="/api/preview/disable">
        You are in preview mode, click to exit
      </Link>
    </div>
  )
}
