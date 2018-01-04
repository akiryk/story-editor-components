import React from 'react'
import { Link } from 'react-router'
import styles from './tablestyle.css'

/**
 * Add extra elements to cells that contain the story title.
 * This is the recommended way to customize cell layout/content according
 * to the react-bootstrap-table documentation.
 * (Logical && is recommended way to do conditional rendering,
 * https://facebook.github.io/react/docs/conditional-rendering.html#inline-if-with-logical--operator )
 * @param {String} cell
 * @param {Object} row
 */
const StoryFormatter = (cell, row) => (
  <div className={styles.story}>
    <Link to={`editor/${row._id}`}>{cell}</Link>
    <ul className={`${styles.story_links} list-inline`}>
      <li className={`${styles.list_inline_item} list-inline-item`}><Link to={`editor/${row._id}`}>Edit</Link></li>
      <li className={`${styles.list_inline_item} list-inline-item`}>{`ID: ${row._id}`}</li>
      { row.primaryAudio.url &&
        <li className={`${styles.list_inline_item} list-inline-item`}>Includes Primary Audio</li>
      }
      { row.primaryImage.url &&
        <li className={`${styles.list_inline_item} list-inline-item`}>Includes Primary Image</li>
      }
    </ul>
  </div>
)

export default StoryFormatter
