import React from 'react'

const About = () => {
    const styles:any = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        minHeight: '80vh',
        padding: '2rem',
        fontSize: '1.2rem',
        lineHeight: '1.5',
        backgroundColor: 'white',
        color: '#333',
      };
    
    return (
        <div  style={styles}>
            At Vital, the people make the difference,
           of course except for our amazing furniture!
            <br></br>
            Behind the success are people who work day and night to provide you with the highest quality 
            product <br></br>alongside the best service.
            <br></br> You are welcome to contact them at any time, they are here for you.
            <br></br>
            Vital began its business in early 1995 as an importer store for gifts and decorative objects.
            <br></br>
            Later it developed even more into a furniture gallery that spans the world. 
            <br></br>Today the company manufactures and imports its products from all over the world:
            <br></br> France, Holland, Bulgaria, Indonesia, Nepal, Morocco, China and more.
            <br></br>
            All the furniture in ViTal is collected with love by Tal and Chavi.
            <br></br> who are good friends that travel the world in order to bring to the gallery
             those original items with a special character.
            <br></br>It goes without saying that solid wood furniture is a lifetime item,
            <br></br>one that you can pass on to your grandchildren, and that time, like wine,
            only does it good.
            <br></br>Hotam's website provides home design tips, design ideas and lots of inspiration.
            <br></br>In addition, you are welcome to come in and receive home styling advice from our interior designers - free of charge!</div>
    )
}

export default About;