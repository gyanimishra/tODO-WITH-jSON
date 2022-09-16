
import react, { useEffect, useState } from 'react'
import axios from 'axios'
import {MDBTable,MDBTableHead,MDBTableBody,MDBRow,MDBCol,MDBContainer,MDBBtn, MDBBtnGroup, MDBPaginationItem,MDBPaginationLink,MDBPagination} from 'mdb-react-ui-kit'
function App() {
  const [data,setdata]= useState([])
  const [searchvalue,setsearchvalue]= useState('')
  const [sortvalue,setsortvalue]= useState('')
  const [currentPage,setcurrentPage]= useState(0)
  const [pageLimit]= useState(4)


  let sortoption=["name","status","email","phone","address"]


   const getdata= (start,end,increase)=>{
    axios.get(`http://localhost:3000/users?_start=${start}&_end=${end}`).then((res)=>{
       setdata(res.data)
       setcurrentPage(currentPage+increase)
    })
   }

   useEffect(()=>{
    getdata(0,4,0)
   },[])
    
  //  console.log(data);
  const handlesearch=(e)=>{
    e.preventDefault()
    axios.get(`http://localhost:3000/users?q=${searchvalue}`).then((res)=>{
       setdata(res.data)
       setsearchvalue('')
    })
}

const handlereset=()=>{
  getdata(0,4,0)
}
const handleSort=(e)=>{
let value= e.target.value

 setsortvalue(value)
 console.log(value,"check");
 console.log(sortvalue);
 axios.get(`http://localhost:3000/users?_sort=${value}&_order=asc`).then((res)=>{
  setdata(res.data)
  
}).catch((err)=>{
  console.log(err)
})
}


const handlefilter=(value)=>{
  axios.get(`http://localhost:3000/users?status=${value}`).then((res)=>{
   setdata(res.data)
   
 }).catch((err)=>{
   console.log(err)
 })
 }

 const renderPagination =()=>{
  if(currentPage===0){
    return(
      <MDBPagination className='mb-0'>
        <MDBPaginationItem>
          <MDBPaginationLink>1</MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem>
          <MDBBtn onClick={()=>getdata(4,8,1)}>Next</MDBBtn>
        </MDBPaginationItem>
      </MDBPagination>
    )
  }
  else if( currentPage<pageLimit-1 && data.length===pageLimit)
  {
    return(
      <MDBPagination className='mb-0'>

      <MDBPaginationItem>
        <MDBBtn onClick={()=>getdata((currentPage-1)*4,currentPage*4,-1)}>Prev</MDBBtn>
      </MDBPaginationItem>
      <MDBPaginationItem>
      <MDBPaginationLink>{currentPage+1}</MDBPaginationLink>
      </MDBPaginationItem>

      <MDBPaginationItem>
        <MDBBtn onClick={()=>getdata((currentPage+1)*4,(currentPage+2)*4,1)}>NEXt</MDBBtn>
      </MDBPaginationItem>
    </MDBPagination>

    )
  }
  else{
    return(
      <MDBPagination className='mb-0'>
    
            <MDBPaginationItem>
              <MDBBtn onClick={()=>getdata(4,8,-1)}>Prev</MDBBtn>
            </MDBPaginationItem>
            <MDBPaginationItem>
            <MDBPaginationLink>{currentPage+1}</MDBPaginationLink>
            </MDBPaginationItem>
            </MDBPagination>
    )
  }
 }


  return (
  
      
      <MDBContainer>
        <form style={{
          margin:"auto",
          padding:"15px",
          maxWidth:"400px",
          alignContent:"center"
        }}
        className='d-flex  input-group w-auto'
        onSubmit={handlesearch}
        >
          <input type="text" placeholder='Search Name...' className='form-control' value={searchvalue} onChange={(e)=>setsearchvalue(e.target.value)}/>

          <MDBBtn type='submit' color='dark'>Search</MDBBtn>
          <MDBBtn  color='info' className='mx-2' onClick={handlereset}>Reset</MDBBtn>

        </form>
        <div style={{marginTop:"70px"}}>
          <h2 className='text-center'>Search Filter Sort and Pagination using JSON server Api</h2>
          <MDBRow>
            <MDBCol size='12'>
              <MDBTable>
                <MDBTableHead dark>
                  <tr>
                    <th scope='col'>No.</th>
                    <th scope='col'>Name.</th>
                    <th scope='col'>Email.</th>
                    <th scope='col'>Phone.</th>
                    <th scope='col'>Address.</th>
                    <th scope='col'>Status.</th>
                  </tr>
                </MDBTableHead>
                {data.length===0?(
                  <MDBTableBody className='align-center mb-0'>
                    <tr>
                      <td colSpan={8} className='text-center  mb-0'>
                        No Data Found
                      </td>
                    </tr>
                  </MDBTableBody>
                ):(
                  data.map((item,index)=>(
                    <MDBTableBody key={index}>
                      <tr>
                        <th scope='row'>{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.address}</td>
                        <td>{item.status}</td>
                      </tr>
                    </MDBTableBody>
                  ))
                )}
              </MDBTable>
            </MDBCol>
          </MDBRow>
          <div style={{
          margin:"auto",
          padding:"15px",
          maxWidth:"400px",
          alignContent:"center"
        }}>

          {renderPagination()}

          </div>
        </div>
        <MDBRow>
          <MDBCol size='8'>
            <h5>Sort By:</h5>
            <select style={{width:"50%", borderRadius:'2px',height:'35px'}} value={sortvalue} onChange={handleSort} > 
            <option>Please Select Value</option>
            {sortoption.map((item,index)=>(
              <option value={item} key={index} >{item}</option>
            ))}

            </select>
          </MDBCol>
          <MDBCol size='4'>
            <h5>Filter By Status:</h5>
            <MDBBtnGroup>
              <MDBBtn color='success' onClick={()=>handlefilter("Active")}>Active</MDBBtn>
              <MDBBtn color='danger' style={{marginLeft:"2px"}}  onClick={()=>handlefilter("Inactive")}>
                Inactive
              </MDBBtn>
            </MDBBtnGroup>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
     
     
 
  );
}

export default App;
