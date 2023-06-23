import React from "react";

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import GitHub from "@mui/icons-material/GitHub";
import { LanguageOutlined } from "@mui/icons-material";

import { urlFor } from "../../client";

import "./Modal.scss";

const container = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3,
      duration: 0.3,
      delayChildren: 0.35,
      staggerChildren: 0.2,
    },
  },
};

export const wrapper = {
  hidden: {
    y: -2,
  },
  visible: {
    y: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

export const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Modal = ({ mobileVersion, modalItem, setIsModalOpen }) => {
  const { mode } = useSelector((state) => state.global);
  const { t, i18n } = useTranslation();
  const onHandleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="modal">
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        }}
        exit={{
          opacity: 0,
        }}
        onClick={onHandleCloseModal}
        className="modal__overlay"
      ></motion.div>
      <motion.div
        initial={{
          scale: 0,
        }}
        animate={{
          scale: 1,
          transition: {
            duration: 0.3,
          },
        }}
        exit={{
          scale: 0,
        }}
        className={mode === "dark" ? "modal__wrapper wrapper--dark" : "modal__wrapper"}
      >
        <motion.div
          className="modal__content--wrapper"
          // initial="hidden"
          // animate="visible"
          // variants={container}
        >
          <div className="modal__image--wrapper">
            {modalItem?.imagesArray &&
              (!mobileVersion ? (
                modalItem.imagesArray.map((image, index) => (
                  <img key={index} className="image" src={urlFor(image)} alt="pizza" />
                ))
              ) : (
                <img className="image" src={urlFor(modalItem.imagesArray[0])} alt="pizza" />
              ))}
          </div>
          <div
            className={
              mode === "dark"
                ? "modal__description--wrapper description--wrapper--dark"
                : "modal__description--wrapper"
            }
          >
            <div
              className={
                mode === "dark" ? "project--info--wrapper info--dark" : "project--info--wrapper"
              }
            >
              <div className="description--wrapper">
                <h1 className="title">{modalItem.title}</h1>
                <p className={mode === "dark" ? "text text--dark" : "text"}>
                  {i18n.language === "english" ? modalItem.description : modalItem.descriptionUkr}
                </p>
              </div>
              <div>
                <h3 className="tech--text">{t("modal_tech")}</h3>
                <motion.div className="tech--array" variants={wrapper}>
                  {modalItem.tech.map((techImg, index) => (
                    <motion.div key={index} className="tech--wrapper" variants={item}>
                      <img className="tech--icon" src={urlFor(techImg)} />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
            <div
              className={
                mode === "dark"
                  ? "bottom--fixed--links--wrapper bottom--menu--dark"
                  : "bottom--fixed--links--wrapper"
              }
            >
              {modalItem?.projectLink && (
                <a
                  href={modalItem.projectLink}
                  target="_blank"
                  className={mode === "dark" ? "source--link src--dark" : "source--link"}
                >
                  <LanguageOutlined fontSize="large" />
                  <h5>{t("modal_link1")}</h5>
                </a>
              )}
              {modalItem?.codeLink && (
                <a
                  href={modalItem.codeLink}
                  target="_blank"
                  className={mode === "dark" ? "source--link src--dark" : "source--link"}
                >
                  <GitHub fontSize="large" />
                  <h5>{t("modal_link2")}</h5>
                </a>
              )}
            </div>
          </div>
          <div
            onClick={onHandleCloseModal}
            className={mode === "dark" ? "modal__cross cross--dark" : "modal__cross"}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.84606 12.4986L0.552631 3.20519C-0.1806 2.47196 -0.1806 1.28315 0.552631 0.549923C1.28586 -0.183308 2.47466 -0.183308 3.20789 0.549923L12.5013 9.84335L21.792 0.552631C22.5253 -0.1806 23.7141 -0.1806 24.4473 0.552631C25.1805 1.28586 25.1805 2.47466 24.4473 3.20789L15.1566 12.4986L24.45 21.792C25.1832 22.5253 25.1832 23.7141 24.45 24.4473C23.7168 25.1805 22.528 25.1805 21.7947 24.4473L12.5013 15.1539L3.20519 24.45C2.47196 25.1832 1.28315 25.1832 0.549923 24.45C-0.183308 23.7168 -0.183308 22.528 0.549923 21.7947L9.84606 12.4986Z"
                fill="black"
              ></path>
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Modal;
