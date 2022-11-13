import React, { FC } from 'react'
import { FiCommand } from 'react-icons/fi'
import { useKmenu } from 'kmenu'

const Intro: FC = () => {
  const { toggle } = useKmenu()

  return (
    <div>
      <nav>
        <div>
          <a
            href='https://kmenu.hxrsh.in'
            target='_blank'
            rel='noopener noreferrer'
          >
            kmenu
          </a>
          <p>Quick and easy access to application functionality</p>
        </div>
        <button onClick={toggle}>
          <FiCommand />
        </button>
      </nav>
      <main>
        <video muted autoPlay loop>
          <source src='https://kmenu.hxrsh.in/Demo.mp4' />
        </video>
        <h2>Overview</h2>
        <p>
          Command menus are a feature that help users navigate your website's
          functionality with ease. Rather than navigating through several menus
          and being frustrated when they can't find features, here they can just
          press cmd/ctrl+k and type away!
        </p>
        <p>
          Do you also want to add this to your site? Check out the{' '}
          <a href='https://github.com/harshhhdev/kmenu'>documentation</a>.
        </p>
      </main>
    </div>
  )
}

export default Intro
