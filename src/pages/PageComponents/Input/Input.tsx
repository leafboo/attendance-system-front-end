import InputCSS from './Input.module.css'

export default function Input() {
  return (
    <>
      <div className={InputCSS['input-container']}>
        <form action="" className={InputCSS['left-section']}>
          <input type="submit" value='Enter' className={InputCSS['enter-button']} />
          <input type="text" placeholder='Input Id no' className={InputCSS['input-box']} />
        </form>
        <button className={InputCSS['right-section']}>Time out &gt;</button>
      </div>

    </>
  )
}