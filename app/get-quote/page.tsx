import React from 'react'

const page = () => {
  return (

    /**main outer div, contains custom tailwind class bg-grid as a background image, this div is meant to fit perfectly 
     * inside of it's parent div, same width and height, so that the page does not scroll
     * it is to center all the items inside of it in the very center, both vertically and horizontally
     * nothing on this page should scroll, it should all fit cleanly in the UI
    */
    <div>

      {/**This is the progress bar div*/}
      <div>

      </div>
      {/**This is the slider form div, it contains the sliding content for each section of the form*/}
      <div className='pt-40 pl-4'>
      Sliding contact form coming soon!
      </div>
      {/**This is the action button div, it contains the scheduled action buttons, sometimes just the next button, sometimes both 
         * next and back buttons, sometimes submit and back button, and sometimes other action buttons
        */}
      <div>

      </div>

    </div>
  )
}

export default page