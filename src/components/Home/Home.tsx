import { IonCard, IonCardContent, IonCol, IonGrid, IonIcon, IonRow, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import './Home.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";

import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { all } from '@/services/carrusel';
import { getPhotoUrl } from '@/helpers/photos';

const Home = ( ) => {

  const [lista, setLista] = useState([]);

  const getLista = async () => {
    const lista = await all();
    setLista( lista.data )
  }

  useIonViewDidEnter(() => {
    getLista();
  })

  return (
    <div id="container">
      <IonGrid>
        <IonRow>
          <IonCol class='swiper-content'>
            <Swiper
                pagination={{ clickable: true }}
                modules={[Pagination]} 
                spaceBetween={0}
                slidesPerView={1}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
            >
              {
                lista.map( (item: any, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <IonCard>
                        <img alt="" src={getPhotoUrl(item.archivo)} />
                      </IonCard>
                    </SwiperSlide>
                  )
                })
              }
            </Swiper>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol>
            <Link to={'/visitas'}>
              <IonCard>
                <img className='ion-margin-top' alt="Silhouette of mountains" src="assets/images/calendar.png" style={{ maxWidth: '128px' }} />
                <IonCardContent>
                  Visitas
                </IonCardContent>
              </IonCard>
            </Link>
          </IonCol>
          <IonCol>
            <IonCard>
              <img className='ion-margin-top' alt="Silhouette of mountains" src="assets/images/guia.png" style={{ maxWidth: '128px' }} />
              <IonCardContent>
                Guías
              </IonCardContent>
            </IonCard>
          </IonCol>
        </IonRow>        
      </IonGrid>
    </div>
  );
};

export default Home;
