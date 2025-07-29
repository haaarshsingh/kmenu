import Link from 'next/link'

const examples = [
  {
    name: 'Basic',
    path: '/examples/basic',
    description: 'a single-page, six command kmenu implementation',
  },
  {
    name: 'Nested',
    path: '/examples/nested',
    description: 'a multi-page kmenu implementation',
  },
  {
    name: 'Dark Mode',
    path: '/examples/dark',
    description: 'an implementation of kmenu with automatic theme detection',
  },
  {
    name: 'Awaiting Data',
    path: '/examples/loading',
    description: 'an implementation of kmenu with dynamically loaded data',
  },
  {
    name: 'Checkbox',
    path: '/examples/checkbox',
    description: "a settings menu implementation using kmenu's checkboxes",
  },
  {
    name: 'Modal',
    path: '/examples/modal',
    description: 'a modal implemented with kmenu',
  },
]

export default function Page() {
  return (
    <main>
      <section>
        <h1>Examples</h1>
        <p>Here&apos;s a list of different things you can build with kmenu. </p>
        <ul>
          {examples.map((example, index) => (
            <li key={index}>
              <Link href={example.path}>
                {example.name}
                <span>—{example.description}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p>
          Done something cool with kmenu and wanna share it?{' '}
          <a
            href='https://github.com/haaarshsingh/kmenu/pulls'
            target='_blank'
            rel='noreferrer'
          >
            Send a pull request.
          </a>
        </p>
      </section>
    </main>
  )
}
