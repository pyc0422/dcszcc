import "./contact.css";
import emailjs from "@emailjs/browser";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import Title from "@/components/utility/Title";
import Loading from "@/components/utility/Loading";
import Swal from "sweetalert2";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitForm = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serviceId: string = process.env.NEXT_PUBLIC_SERVICE_ID!;
    const templateId: string = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
    const publicKey: string = process.env.NEXT_PUBLIC_PUBLIC_KEY!;
    try {
      setLoading(true);
      await emailjs.sendForm(serviceId, templateId, "#contact_form", publicKey);
      Swal.fire("发送成功", "感谢您的关注，我们将尽快恢复您的信息");
    } catch (error) {
      console.log(error);
    } finally {
      handleReset();
      setLoading(false);
    }
    //const formURL = e.target.action
    const data = new FormData();
  };

  const handleReset = () => {
    // Reset the input data to an empty string
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="m-[10px] p-0 w-screen md:w-[960px]" id="contact">
      <Title text="联系我们 ｜ Contact" custom="md:mt-28" />
      <div className="text-center md:mt-8 md:mb-16">Get in touch with us</div>

      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={submitForm} className="px-2 md:px-0" id="contact_form">
          <div className="row-container">
            <div className="md:w-1/2 flex flex-wrap flex-col md:flex-row items-center">
              <label className="text-center pr-4">姓名</label>
              <input
                type="text"
                name="name"
                className="w-full md:w-4/5 h-[30px]"
                placeholder=" Your Name"
                onChange={handleInput}
                value={formData.name}
              />
            </div>
            <div className="md:w-1/2 flex flex-wrap flex-col md:flex-row md:justify-end items-center">
              <label htmlFor="email" className="text-center px-4">
                邮箱
              </label>
              <input
                type="text"
                name="email"
                className="w-full md:w-4/5 h-[30px]"
                placeholder=" Your Email"
                onChange={handleInput}
                value={formData.email}
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-md font-normal">消息</label>
            <textarea
              name="message"
              className="p-2 h-[100px] md:h-[200px] rounded-md"
              onChange={handleInput}
              placeholder=" Your Message"
              value={formData.message}
            />
          </div>
          <div className="flex flex-row">
            <Button
              variant="outlined"
              fullWidth
              onClick={handleReset}
              sx={{
                color: "#2a2a2b",
                borderColor: "#2a2a2b",
                margin: "1rem",
                "&:hover": {
                  color: "black !important",
                  borderColor: "#101a30",
                },
              }}
            >
              重 置
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                margin: "1rem",
                bgcolor: "#2a2a2b !important",
                "&:hover": { color: "white !important" },
              }}
              type="submit"
            >
              发 送
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
