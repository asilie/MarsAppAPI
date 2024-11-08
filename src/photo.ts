export default interface photo {
    id: number;
    sol: number;
    camera: { id: number;
        name: 'FHAZ';
        rover_id: number;
        full_name: string;};
    img_src: string;
    earth_date: string;
  }