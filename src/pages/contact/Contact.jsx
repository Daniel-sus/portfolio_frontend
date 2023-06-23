import React from "react";

import { useSelector } from "react-redux";
import ReactCurvedText from "react-curved-text";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

import { Email, LinkedIn, Telegram } from "@mui/icons-material";
import { Button, CircularProgress, Link, TextField, Typography } from "@mui/material";

import AppWrap from "../../wrapper/AppWrap";

import "./Contact.scss";

const Contact = ({ handleClick }) => {
  const [loading, setLoading] = React.useState(false);
  const form = React.useRef();
  const { t, i18n } = useTranslation();
  const { mode } = useSelector((state) => state.global);

  const emailOnHandleClick = () => {
    navigator.clipboard.writeText("dan.yaroshovets@gmail.com");
    handleClick("success", t("snackbar_text1"));
  };

  const sendEmail = (e) => {
    setLoading(true);
    e.preventDefault();
    emailjs.sendForm("service_r4xe71f", "template_0gsia3a", form.current, "as9JKVB0Nn0KwE2OE").then(
      (result) => {
        setLoading(false);
        e.target.reset();
        handleClick("success", t("snackbar_text2"));
      },
      (error) => {
        setLoading(false);
        e.target.reset();
        handleClick("error", t("snackbar_text3"));
      }
    );
  };

  return (
    <div className="contact">
      <Typography variant="h1" textTransform="uppercase">
        {t("contact_title")}
      </Typography>
      <marquee className="contact__scrolling-text">{t("contact_curved_text")}</marquee>
      <div className="contact__wrapper">
        <div className="contact__links">
          <h3 className="title">{t("contact_subtitle1")}</h3>
          <div className="links__wrapper">
            <div className="link" onClick={emailOnHandleClick}>
              <Email
                color="secondary"
                sx={{
                  transition: "0.3s",
                  "&:hover": { scale: "1.05" },
                }}
                className="mui--icon"
                fontSize="large"
              />
              <div>
                <h6 className="link__name">Email</h6>
                <p>dan.yaroshovets@gmail.com</p>
              </div>
            </div>
            <Link href="https://t.me/daniel7375" target="_blank" color="black" underline="none">
              <div className={mode === "dark" ? "link link--dark" : "link"}>
                <Telegram
                  color="secondary"
                  sx={{
                    transition: "0.3s",
                    "&:hover": { scale: "1.05" },
                  }}
                  className="mui--icon"
                  fontSize="large"
                />
                <div>
                  <h6 className="link__name">Telegram</h6>
                  <p>@daniel7573</p>
                </div>
              </div>
            </Link>
            <Link
              href="https://www.linkedin.com/in/daniel-yaroshovets-🇺🇦-84184a247/"
              target="_blank"
              color="black"
              underline="none"
            >
              <div className={mode === "dark" ? "link link--dark" : "link"}>
                <LinkedIn
                  color="secondary"
                  sx={{
                    transition: "0.3s",
                    "&:hover": { scale: "1.05" },
                  }}
                  className="mui--icon"
                  fontSize="large"
                />
                <div>
                  <h6 className="link__name">LinkedIn</h6>
                  <p>Daniel Yaroshovets</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="contact__form">
          <h3 className="title">{t("contact_subtitle2")}</h3>
          <form ref={form} onSubmit={sendEmail} className="form">
            <TextField
              id="outlined-basic"
              fullWidth
              required={true}
              color="secondary"
              name="name"
              label={t("contact_name")}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              color="secondary"
              type="email"
              required={true}
              name="email"
              label={t("contact_mail")}
              variant="outlined"
            />
            <TextField
              id="outlined-multiline-static"
              label={t("contact_project")}
              required={true}
              color="secondary"
              name="project"
              multiline
              rows={5}
            />
            <Button type="submit" variant="contained" color="secondary" sx={{ width: "60%" }}>
              {loading ? <CircularProgress size={20} /> : t("contact_button")}
            </Button>
          </form>
        </div>
        <div className="contact__curved-text">
          <div className="text__curved">
            <ReactCurvedText
              width={300}
              height={300}
              cx={150}
              cy={150}
              rx={100}
              ry={100}
              startOffset={0}
              reversed={false}
              text={t("contact_curved_text")}
              textProps={{
                style: {
                  fontSize: i18n.language === "english" ? 27 : 26.2,
                  fill: mode === "dark" && "white",
                },
              }}
              textPathProps={null}
              tspanProps={null}
              ellipseProps={null}
              svgProps={null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWrap(Contact, "contact");
