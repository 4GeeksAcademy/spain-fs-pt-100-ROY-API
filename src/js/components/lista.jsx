import React, { useEffect, useState } from "react";






const Lis = () => {




    const [data, setData]=useState([]);
    const [tarea, setTarea]= useState ('')


    useEffect(() => {

        getTareaUsuario()


    }, [])
    
//POST
    const crearUsuario=()=>{
        fetch ('https://playground.4geeks.com/todo/users/RoyCuba',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
         .then(resp => {
            if(!resp.ok) throw new Error (`error code: ${resp.status}`)
        })
     .then(data => getTareaUsuario())
     .catch(err => console.log(err))

    }









const submit =(e)=>{
    e.preventDefault();  
    if (tarea.length > 0){

        fetch ('https://playground.4geeks.com/todo/todos/RoyCuba',{
    
            method: 'POST',
            body :JSON.stringify({
                "label": tarea,
                "is_done":false
            }),
         headers :{'Content-Type': 'application/json'}
                           
        })
        .then(resp =>{
    
    if(!resp.ok) throw new Error (`error code: ${resp.status}`)
        return resp.json()
    
        })
        .then(data => { 
            console.log(data)
            setTarea('')
    
    
        })
        .catch(err => console.log(err))
    }   
    
    setData([...data,{label: tarea, is_done:false}])
    
      }

const handleDelete = (id) => {
    console.log(id)
    fetch('https://playground.4geeks.com/todo/todos/' + id, {
        method: 'DELETE', //que tipo de pedido 
    })
        .then(resp => {
            getTareaUsuario()
        })

}
 console.log(data)

 //GET
const getTareaUsuario =()=>{
    fetch ('https://playground.4geeks.com/todo/users/RoyCuba')
    .then(resp =>{

        if(!resp.ok) throw new Error (`error code: ${resp.status}`)
            return resp.json()
    })
    .then(data =>setData(data.todos))
    .catch(err =>crearUsuario())
}

 const totales =()=>{
    return data.length
    }
    
    let total = totales()

    return  (
		<div className="text-center container-fluid">
			

			<form onSubmit={submit} >
				
			<div className="card border-success mb-3" >
  <div className="card-header bg-transparent border-success">
  <div className="input-group mb-3">
  <button hidden className="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
  <input type="text" value={tarea} onChange={e => setTarea(e.target.value)} className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"/>
</div>

  </div>
  <div className="card-body text-success">
  {data && data.map((el, i) => <p key={i} >
					<p className="d-flex justify-content-between">{el.label}<span  onClick={() => handleDelete(el.id)}>X</span> </p>
				</p>)}
    
  </div>
  <div className="card-footer bg-transparent border-success">{total}</div>
</div>
			
			
            </form>
		</div>
	);
};


export default Lis;





