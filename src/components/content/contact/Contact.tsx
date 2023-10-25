import "./contact.css"
import Typography from '@mui/material/Typography';
import emailjs from '@emailjs/browser';
import React, { useState } from "react";
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';



export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e:any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e:any) => {
    console.log(e.target.name);
    console.log(e.target.email);
    console.log(e.target.message);
    e.preventDefault();
    const serviceId:string= process.env.NEXT_PUBLIC_SERVICE_ID!;
    const templateId:string=process.env.NEXT_PUBLIC_TEMPLATE_ID!;
    const publicKey:string=process.env.NEXT_PUBLIC_PUBLIC_KEY!;
     //emailjs.sendForm('service_nmw8i6s','template_f5lgqx5',e.target,'PzFIFuHM9Om215jxv')

   emailjs.sendForm(serviceId, templateId,e.target,publicKey);

    //const formURL = e.target.action
    const data = new FormData()

  }

  const handleReset = (e:any) => {
    // Reset the input data to an empty string
    setFormData({
      name: "",
    email: "",
    message: ""
    });
  };


  return (
    <div>

      <Typography align="center" variant="h5" fontWeight={600}> 联系我们  |  Contact</Typography>
      <Typography align="center" variant="body1">Get in touch with us</Typography>
      {formSuccess ?
        <div>{formSuccessMessage}</div>
        :
        <form  onSubmit={submitForm}>
          <div className='row-container'>
            <div className='div1'>
            <Typography  variant="body1" fontWeight={500}>姓名</Typography >
            </div>
            <div className='div2'>
             <Typography  variant="body1" fontWeight={500}>电子邮件</Typography>
             </div>
          </div>

          <div className='row-container2'>
            <div className='div3'>
            <input type='text' name='name' style={{ height: '30px' }} placeholder=" Your Name" onChange={handleInput} value={formData.name} />
            </div>

             <div className='div4'>
            <input type='text' name='email' style={{ height: '30px' }} placeholder=" Your Email" onChange={handleInput} value={formData.email} />
            </div>
           </div>

          <div>
            <Typography  variant="body1" fontWeight={500}>消息</Typography> <br/>
            <div className="message">
            <input type='text' name="message"  style={{ height: '30px' }} onChange={handleInput} placeholder=" Your Message"value={formData.message} />
            </div>
          </div>

          <Grid container justifyContent="center" alignItems="center"  spacing={2} >
            <Grid item>
          <button className="custom-button" type="submit" >发送</button>
          </Grid>
           <Grid item>
          <button className="custom-button"  type="button" onClick={handleReset} >重置</button>
          </Grid>
          </Grid>
        </form>
      }
    </div>
  )
}