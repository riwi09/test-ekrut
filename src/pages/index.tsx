import { Fragment, useState } from 'react';
import MetaTag from '@/components/MetaTag';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import BasicInformation from '@/components/FormRegister/BasicInformation';
import EducationInformation from '@/components/FormRegister/EducationInformation';
import ExperienceInformation from '@/components/FormRegister/ExperienceInformation';
import { useSelector, useDispatch } from 'react-redux';
import { postNewUser, postNewEducation, postNewExperience } from '@/service/UserApi';
import { cekRequired, cekRequiredEducation, cekRequiredExperience } from '../helper/cekValue';
import Preloader from '@/components/Preloader';

const Index = () => {
  const { global_information_basic, global_information_education, global_information_experience } = useSelector(
    (res: any) => res.state,
  );

  const dispatch = useDispatch();

  const [isShow, setIsShow] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmitForm = async () => {
    const usrData = global_information_basic;
    let param = {
      fullname: usrData.fullName,
      phone: usrData.phoneNumber,
      email: usrData.email,
    };

    let cekUser = true;
    for (var key in usrData) {
      if (usrData.hasOwnProperty(key)) {
        cekUser = cekRequired(usrData[key]);
      }
    }

    if (!cekUser) {
      alert('Basic Information is Required');
      return;
    }

    const cekEdu = await cekRequiredEducation(global_information_education, dispatch);
    if (!cekEdu) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const cekExpr = await cekRequiredExperience(global_information_experience, dispatch);

    if (cekUser === true && cekEdu === true && cekExpr === true) {
      setIsLoader(true);

      const resUser = await postNewUser(param);
      console.log('User Information =>', resUser);

      if (resUser.status === 200) {
        const id = resUser.data.id;

        let paramEducation = [];
        await global_information_education.data.map((d: { school: { value: string }; major: { value: string } }) => {
          paramEducation.push({
            school: d.school.value,
            major: d.major.value,
            user_id: id,
          });
        });

        const resEducation = await postNewEducation(paramEducation);
        console.log('Education => ', resEducation);

        let paramExperience = [];
        await global_information_experience.data.map((d: { company: { value: string }; title: { value: string } }) => {
          paramExperience.push({
            company: d.company.value,
            title: d.title.value,
            user_id: id,
          });
        });

        const resExperience = await postNewExperience(paramExperience);
        console.log('Experience=>', resExperience);
        setIsShow(true);
        setIsSuccess(true);
      } else {
        setIsShow(true);
      }

      setIsLoader(false);
    }
  };

  const handleCloseModal = () => {
    setIsShow(false);
    if (isSuccess) {
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  };

  return (
    <Fragment>
      <MetaTag />

      <Modal show={isShow} onHide={handleCloseModal} backdrop="static" keyboard={false} centered>
        <Modal.Body className="text-center">
          {isSuccess ? (
            <>
              <span className="fa fa-check-circle mr-2" style={{ fontSize: '100px' }}></span>
              <h5 className="my-4">Congratulations, you have successfully saved the data</h5>
            </>
          ) : (
            <>
              <span className="fa fa-times-circle" style={{ fontSize: '100px', color: 'red' }}></span>
              <h5 className="my-4">Your email is already registered</h5>
            </>
          )}

          <Button onClick={handleCloseModal} className="px-3">
            CLOSE
          </Button>
        </Modal.Body>
      </Modal>

      <Preloader visible={isLoader} />

      <Container className="my-5">
        <Row className=" justify-content-center">
          <Col sm={8} xs={12}>
            <BasicInformation />
            <EducationInformation />
            <ExperienceInformation />
          </Col>
          <Col sm={8} xs={12} className="mt-3">
            <Button block size="lg" variant="primary" onClick={handleSubmitForm}>
              Save
            </Button>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
