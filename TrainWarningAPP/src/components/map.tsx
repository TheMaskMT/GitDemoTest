// 10.963286, 106.854736
import * as React from 'react'
import { Iframe } from '@bounceapp/iframe'

// export function Map(lat, long) {
//     const mapUri = "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q="+lat+",%20"+long+"+(My%20Place)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
//     console.log(typeof mapUri)

//     return(    
//         <Iframe         
//             //uri= {'https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=10.963286,%20106.854736+(My%20Place)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'}
//             //uri= "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=10.953563,%20106.799445+(My%20Place)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
//             //uri= "https://maps.google.com/maps?width=100%25&;height=600&;hl=en&;q=10.963286,106.854736+(My%20Place)&;t=&;z=14&;ie=UTF8&;iwloc=B&;output=embed"
//             uri= {mapUri}
//             //uri= "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=10.953563,%20106.799445+(My%20Place)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
//             //src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15668.973417643556!2d106.87243145438883!3d10.944981114564161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174de7f754a8663%3A0x23f79485b6ab37c4!2zQuG7h25oIFZp4buHbiDEkGEgS2hvYSDEkOG7k25nIE5haQ!5e0!3m2!1svi!2s!4v1723019420638!5m2!1svi!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
//             style={{ width: '100%', height: '100%'}}
//         />
//     )
// }

export function Map() {
    console.log("Có call map!")
    return (    
        <Iframe 
        uri= "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=10.953563,%20106.799445+(My%20Place)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        style={{ width: '100%', height: '100%' }} />
    );
}

export function MapReal({ lat, long })
{
    const mapUri = `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${lat},%20${long}(My%20Place)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`;
    console.log(typeof [mapUri])
    //console.log(document.getElementsByTagName('Iframe').uri)
    return(
        <Iframe 
        uri= "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q='+lat+',%20'+long+'106.799445+(My%20Place)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
        //uri
        style={{ width: '100%', height: '100%' }} />
    )
    
}

{/* <ReactIframe 
          url='https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15668.880921940221!2d106.8060391!3d10.94672995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1723017396800!5m2!1svi!2s'
          width='600px'
          height='450px'
        /> */}