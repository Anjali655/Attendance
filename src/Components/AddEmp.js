import React from 'react'

function AddEmp() {
  return (
    <div>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
    </div>
  )
}

export default AddEmp;