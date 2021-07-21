import { Card, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setBasicInformation } from '@/redux/actions/postActions';

const BasicInformation = () => {
  const { global_information_basic } = useSelector((res: any) => res.state);
  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    const name = e.target.name;
    const val = e.target.value;
    let data = global_information_basic;

    switch (name) {
      case 'full_name':
        data = { ...data, fullName: val };
        break;
      case 'phone_number':
        data = { ...data, phoneNumber: val };
        break;
      case 'email':
        data = { ...data, email: val };
        break;
      default:
        break;
    }
    dispatch(setBasicInformation(data));
  };

  return (
    <>
      <Card>
        <Card.Header>
          <h4 className="mb-0 font-weight-bold text-uppercase">Basic Information</h4>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" name="full_name" placeholder="Enter your name" onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phone_number"
              placeholder="Enter your phone number"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
};

export default BasicInformation;
