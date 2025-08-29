import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_ROUTE = '';

export const sendEmail = (data) => {
  return axios
    .post(API_BASE_ROUTE + 'email', data)
    .then((response) => {
      return response?.status;
    })
    .catch((e) => {
      return 'error';
    });
};

export const useForm = () => {
  const [values, setValues] = useState({});
  const [msg, setMsg] = useState('');
  const [loading, setLoading]= useState(false);

  useEffect(() => {
    if (msg?.length > 0) {
      setTimeout(() => setMsg(""), 6000)
    }
  }, [msg])

  const updateValues = (newValue, key) => {
    setValues({ ...values, [key]: newValue})
  }

  const handleContactEmail = async () => {
    const name = values?.name;
    const email = values?.email;
    const phone = values?.phone;
    const message = values?.message;

    if (!loading) {
      setLoading(true);
      if (name && (phone || email)) {
        const data = {
          subject: "new contact request on hookm.com",
          email: 'info@theo-corp.com',
          content: `<p>${name} submitted the contact form on theodent.com.<ul><li>phone: ${phone}</li><li>email: ${email}</li><li>message: ${message}</li></ul></p>`,
          pass: '6h2NE62g7&aq',
        };
        let res = await sendEmail(data);

        if (res === 200) {
          setValues({})
          setMsg(
            "Message sent! someone from our team will reach out to you ASAP"
          );
        } else {
          setMsg(
            "There was a problem sending your request, please try again or reach out to us by phone"
          );
        }
      } else if (!name) {
        setMsg("Please add your name");
      } else if (!(phone || email)) {
        setMsg("Please add your phone or email so we can get back to you");
      }
      setLoading(false);
    }
  };

  return {
    msg,
    values,
    setMsg,
    updateValues,
    handleContactEmail
  }
}


// const email = req.body.email;
// const subject = req.body.subject;
// const content = req.body.content;
// const pass = req.body.pass;
// 6h2NE62g7&aq
