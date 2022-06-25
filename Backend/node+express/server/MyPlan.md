Server should run on 8081

API Required

/pitches
Endpoint to post a pitch to the backend

    method: POST
    parameter:
    {
        "entrepreneur": "string",
        "pitchTitle": "string",
        "pitchIdea": "string",
        "askAmount": float,
        "equity": float
    }

    Response:
        success:
        reponse code - 201
        {
            "id":"string"
        }

        failure:
        reponse code - 400

       Example -

       Request- 
            
            curl --location --request POST 'http://<Server_URL>/pitches' \

            --header 'Content-Type: application/json' \

            --data-raw '{

            "entrepreneur": "Ashok kumar",

            "pitchTitle" : "Crio.Do - Work-experience based learning programs for developers",

            "pitchIdea" : "Build professional projects like the top 1% developers. Master the latest full stack and backend tech with real work-ex. Crack developer jobs at the best tech companies.",

            "askAmount": 10000000.25,

            "equity" : 12.5

            }'

        Response-
        {
            "id": "1"
        }

/pitches/<pitch_id>/makeOffer
Endpoint to make a counter offer for a pitch to the backend

    method: POST
    parameter:
    {
        "investor": "string",
        "amount": float,
        "equity": float,
        "comment": "string",
    }

    Response:
        1) success:
        reponse code - 201
        {
            "id":"string"
        }

        2) failure: Pitch Not Found
        reponse code - 404

        3) Invalid Request Body
        reponse code - 400

       Example -

       Request- 
            
            curl --location --request POST 'http://<Server_URL>/pitches/1/makeOffer' \

            --header 'Content-Type: application/json' \

            --data-raw '{

            "investor": "Anupam Mittal",

            "amount" : 10000000.56,

            "equity" : 20.2,

            "comment": "A new concept in the ed-tech market. I can relate with the importance of the Learn By Doing philosophy. Keep up the Good Work! Definitely interested to work with you to scale the vision of the company!"

            }'

        Response-
        {
            "id": "1"
        }

/pitches

Endpoint to fetch the all the pitches in the reverse chronological order ( i.e. last created one first ) from the backend

    method: GET

    Response:
        success:
        reponse code - 200
        {
            A list of Pitches
            "pitches": [
                .
                .
                {
                    "id": "string",
                    "entrepreneur": "string",
                    "pitchTitle": "string",
                    "pitchIdea": "string",
                    "askAmount": float,
                    "equity": float,
                    "offers": [
                        .
                        .
                        {
                            "id": "string",
                            "investor": "string",
                            "amount": float,
                            "equity": float,
                            "comment": "string",
                        }
                    ],
                }
            ]
        }

        failure:
        If there are no pitches available then an empty array shall be returned.


        Example 
        
        Request-
            curl --location --request GET 'http://<Server_URL>/pitches'

        Response 
            [

                {

                    "id":"2",

                    "entrepreneur":"Sanjay kumar",

                    "pitchTitle":"Lenskart - Sabo Chashma Pehnao",

                    "pitchIdea":"Lenskart's aim is to help drop this number marginally in the coming years, which can be achieved by providing high quality eyewear to millions of Indians at affordable prices, giving free eye check ups at home and by extending our services to the remote corners of India.",

                    "askAmount":20000000,

                    "equity":15,

                    "offers":[

                        

                    ]

                },

                {

                    "id":"1",

                    "entrepreneur":"Ashok kumar",

                    "pitchTitle":"Crio.Do - Work-experience based learning programs for developers",

                    "pitchIdea":"Build professional projects like the top 1% developers. Master the latest full stack and backend tech with real work-ex. Crack developer jobs at the best tech companies.",

                    "askAmount":10000000,

                    "equity":12.5,

                    "offers":[

                        {

                            "id":"1",

                            "investor":"Anupam Mittal",

                            "amount":10000000,

                            "equity":20,

                            "comment":"A new concept in the ed-tech market. I can relate with the importance of the Learn By Doing philosophy. Keep up the Good Work! Definitely interested to work along with you"

                        }

                    ]

                }

            ]

/pitches/<pitch_id>
Endpoint to specify a particular id (identifying the pitch) to fetch a single Pitch.

    Method: GET

    Response:
        success:
        reponse code - 200
        {
            A single Pitch
            "pitches": 
                {
                    "id": "string",
                    "entrepreneur": "string",
                    "pitchTitle": "string",
                    "pitchIdea": "string",
                    "askAmount": float,
                    "equity": float,
                    "offers": [
                        .
                        .
                        {
                            "id": "string",
                            "investor": "string",
                            "amount": float,
                            "equity": float,
                            "comment": "string",
                        }
                    ],
                }
        }

        failure:
        Pitch Not Found
        response Code - 404

        Example 

        Request 
            curl --location --request GET 'http://<Server_URL>/pitches/2'

        Response
            {

            "id":"2",

            "entrepreneur":"Sanjay kumar",

            "pitchTitle":"Lenskart - Sabo Chashma Pehnao",

            "pitchIdea":"Lenskart's aim is to help drop this number marginally in the coming years, which can be achieved by providing high quality eyewear to millions of Indians at affordable prices, giving free eye check ups at home and by extending our services to the remote corners of India.",

            "askAmount":20000000,

            "equity":15,

            "offers":[]

            }

         

       