from flask import Flask, request, jsonify
import json
import requests
from geolib import geohash
app = Flask(__name__)

@app.route('/')
def hello():
    return app.send_static_file('index.html')

@app.route('/display', methods=["GET"])
def display():
    keyword = request.args.get('keyword')
    segmentId = request.args.get('category')
    radius = request.args.get('distance')
    longitude = request.args.get('longitude')
    latitude = request.args.get('latitude')
    # print("lattt",latitude)
    # print("longg",longitude)
    geoPoint = geohash.encode(latitude,longitude,7) 
    # print('here',keyword)

    ticketMasterURL = "https://app.ticketmaster.com/discovery/v2/events.json"
    api_key = 'QYusuMbq0IXJ5RArS91Kap13YQXOBGi0'
    params = {"apikey":api_key,  'keyword':keyword, 'segmentId': segmentId, 'radius': radius, 'unit':'miles', 'geoPoint': geoPoint}
    apiResponse = requests.get(ticketMasterURL, params=params).json()
    # print('TableData',apiResponse)
    if '_embedded' in apiResponse:
        if 'events' in apiResponse['_embedded']:
            embeded_events = apiResponse['_embedded']['events']
        else:
            embeded_events=[]
    else:
        embeded_events=[]

    
    resultArray=[]
    for event in embeded_events:
        temp={}
        if 'name' in event:
            temp['name'] = event['name']
        else:
            temp['name'] = ''
        if 'id' in event:
            temp['id'] = event['id']
        else:
            temp['id'] = ''
        if 'url' in event:
            temp['bookingURL'] = event['url']
        else:
            temp['bookingURL']=''
        if 'images' in event:
            if(len(event['images'])>0):
                temp['imageURL'] = event['images'][0]['url']
            else:
                temp['imageURL'] = ''
        else:
            temp['imageURL'] = ''
        if 'dates' in event:
            if 'start' in event['dates']:
                if 'localDate' in event['dates']['start']:
                    temp['localDate'] = event['dates']['start']['localDate']
                else:
                    temp['localDate']=''
            else:
                    temp['localDate']=''
        else:
                    temp['localDate']=''   
                   
        if 'dates' in event:
            if 'start' in event['dates']:
                if 'localTime' in event['dates']['start']:
                    temp['localTime'] = event['dates']['start']['localTime']
                else:
                    temp['localTime']=''
            else:
                    temp['localTime']=''
        else:
                    temp['localTime']=''   

        if 'classifications' in event:
            if(len(event['classifications']) > 0):
                if 'segment' in event['classifications'][0]:
                    if 'name' in event['classifications'][0]['segment']:
                        temp['genre'] = event['classifications'][0]['segment']['name']
                    else:
                        temp['genre'] = ''
                else:
                    temp['genre'] = ''
            else:
                temp['genre'] = ''
        else:
            temp['genre'] = ''
        if '_embedded' in event:
            if('venues' in event['_embedded']):
                if len(event['_embedded']['venues'])>0:
                    if 'name' in event['_embedded']['venues'][0]:
                        temp['venueName'] = event['_embedded']['venues'][0]['name']
                    else:
                        temp['venueName']=''
                else:
                        temp['venueName']=''
            else:
                        temp['venueName']=''
        else:
                        temp['venueName']=''  
        if 'id' in event:
             temp['id'] = event['id']
        else:
             temp['id'] = ''        

        resultArray.append(temp)

    response = { 'result':resultArray}            
    apiResponse = jsonify(response)
    #print(ticketmaster_response.headers)
    apiResponse.headers['Access-Control-Allow-Origin'] = '*'
    print("------------------")

    return apiResponse

@app.route('/event', methods=["GET"])
def event():
    id = request.args.get('eventID')
    apiKey = 'QYusuMbq0IXJ5RArS91Kap13YQXOBGi0'
    ticketMasterURL = "https://app.ticketmaster.com/discovery/v2/events/"+str(id)+"?apikey="+apiKey
    apiResponse = requests.get(ticketMasterURL).json()
    print('EventData',apiResponse)
    resultArray=[]
    temp={}

    if 'name' in apiResponse:
        temp['fullName'] = apiResponse['name']
    else:
        temp['fullName'] = ''

    if '_embedded' in apiResponse:
        if 'attractions' in apiResponse['_embedded']:
            if len(apiResponse['_embedded']['attractions'])>0:
                if 'name' in apiResponse['_embedded']['attractions'][0]:
                    temp['nameOfEvent'] = apiResponse['_embedded']['attractions'][0]['name']
                else:
                    temp['nameOfEvent'] = ''
            else:
                temp['nameOfEvent'] = ''
        else:
            temp['nameOfEvent'] = ''
    else:
        temp['nameOfEvent'] = ''
    if 'url' in apiResponse:
        temp['bookingURL'] = apiResponse['url']
    else:
         temp['bookingURL'] = ''
    if 'dates' in apiResponse:
         if 'start' in apiResponse['dates']:
              if 'localDate' in apiResponse['dates']['start']:
                temp['localDate'] = apiResponse['dates']['start']['localDate']
              else:
                temp['localDate'] = ''
         else:
            temp['localDate'] = ''
    else:
         temp['localDate'] = ''
    if 'dates' in apiResponse:
         if 'start' in apiResponse['dates']:
              if 'localTime' in apiResponse['dates']['start']:
                temp['localTime'] = apiResponse['dates']['start']['localTime']
              else:
                temp['localTime'] = ''
         else:
            temp['localTime'] = ''
    else:
         temp['localTime'] = ''
    if 'dates' in apiResponse:
         if 'status' in apiResponse['dates']:
              if 'code' in apiResponse['dates']['status']:
                temp['ticketStatus'] = apiResponse['dates']['status']['code']
              else:
                temp['ticketStatus'] = ''
         else:
            temp['ticketStatus'] = ''
    else:
        temp['ticketStatus'] = ''
    if 'classifications' in apiResponse:
        
        if len(apiResponse['classifications'])>0:
            if 'segment' in apiResponse['classifications'][0]:
                if 'name' in apiResponse['classifications'][0]['segment']:
                    if apiResponse['classifications'][0]['segment']['name'] != "Undefined" and apiResponse['classifications'][0]['segment']['name'] != "undefined":
                        temp['segment'] = apiResponse['classifications'][0]['segment']['name']
                    else:
                        temp['segment'] = ''
                else:
                    temp['segment'] = ''
            else:
                temp['segment'] = ''
        else:
            temp['segment'] = ''
    else:
        temp['segment'] = ''
    
    if 'classifications' in apiResponse:
        
        if len(apiResponse['classifications'])>0:
            if 'genre' in apiResponse['classifications'][0]:
                if 'name' in apiResponse['classifications'][0]['genre']:
                    if apiResponse['classifications'][0]['genre']['name'] != "Undefined" and apiResponse['classifications'][0]['genre']['name'] != "undefined":
                        temp['genre'] = apiResponse['classifications'][0]['genre']['name']
                    else:
                        temp['genre']=''
                else:
                    temp['genre'] = ''
            else:
                temp['genre'] = ''
        else:
            temp['genre'] = ''
    else:
        temp['genre'] = ''

    if 'classifications' in apiResponse:
        
        if len(apiResponse['classifications'])>0:
            if 'subGenre' in apiResponse['classifications'][0]:
                if 'name' in apiResponse['classifications'][0]['subGenre']:
                    if apiResponse['classifications'][0]['subGenre']['name'] != "Undefined" and apiResponse['classifications'][0]['subGenre']['name'] != "undefined":
                        temp['subGenre'] = apiResponse['classifications'][0]['subGenre']['name']
                    else:
                        temp['subGenre']=''
                else:
                    temp['subGenre'] = ''
            else:
                temp['subGenre'] = ''
        else:
            temp['subGenre'] = ''
    else:
        temp['subGenre'] = ''
    
    if 'classifications' in apiResponse:
        
        if len(apiResponse['classifications'])>0:
            if 'subType' in apiResponse['classifications'][0]:
                if 'name' in apiResponse['classifications'][0]['subType']:
                    if apiResponse['classifications'][0]['subType']['name'] != "Undefined" and apiResponse['classifications'][0]['subType']['name'] != "undefined":
                        temp['subType'] = apiResponse['classifications'][0]['subType']['name']
                    else:
                        temp['subType'] =''
                else:
                    temp['subType'] = ''
            else:
                temp['subType'] = ''
        else:
            temp['subType'] = ''
    else:
        temp['subType'] = ''

    if 'classifications' in apiResponse:
        
        if len(apiResponse['classifications'])>0:
            if 'type' in apiResponse['classifications'][0]:
                if 'name' in apiResponse['classifications'][0]['type']:
                    if apiResponse['classifications'][0]['type']['name'] != "Undefined" and apiResponse['classifications'][0]['type']['name'] != "undefined":
                        temp['type'] = apiResponse['classifications'][0]['type']['name']
                    else:
                        temp['type'] = ''
                else:
                    temp['type'] = ''
            else:
                temp['type'] = ''
        else:
            temp['type'] = ''
    else:
        temp['type'] = ''
    
    


    
    if 'seatmap' in apiResponse:
        if 'staticUrl' in apiResponse['seatmap']:
            temp['seatmapUrl'] = apiResponse['seatmap']['staticUrl']
        else:
            temp['seatmapUrl']=''
    else:
        temp['seatmapUrl'] = ''
    if '_embedded' in apiResponse:
        if 'venues' in apiResponse['_embedded']:
            if len(apiResponse['_embedded']['venues'])>0:
                if 'name' in apiResponse['_embedded']['venues'][0]:
                    temp['venueName'] = apiResponse['_embedded']['venues'][0]['name']
                else:
                    temp['venueName'] = ''
            else:
                temp['venueName'] = ''
        else:
            temp['venueName'] = ''
    else:
        temp['venueName'] = ''
    
    if '_embedded' in apiResponse:
        if 'attractions' in apiResponse['_embedded']:
            if len(apiResponse['_embedded']['attractions'])>0:
                if 'url' in apiResponse['_embedded']['attractions'][0]:
                    temp['upcomingEventsLink'] = apiResponse['_embedded']['attractions'][0]['url']
                else:
                    temp['upcomingEventsLink'] = ''
            else:
                temp['upcomingEventsLink'] = ''
        else:
            temp['upcomingEventsLink'] = ''
    else:
        temp['upcomingEventsLink'] = ''
    
    if 'priceRanges' in apiResponse:
        if len(apiResponse['priceRanges'])>0:
            if 'min' in apiResponse['priceRanges'][0]:
                temp['minPrice'] = apiResponse['priceRanges'][0]['min']
            else:
                temp['minPrice'] = ''
        else:
            temp['minPrice'] = ''
    else:
        temp['minPrice'] = ''

    if 'priceRanges' in apiResponse:
        if len(apiResponse['priceRanges'])>0:
            if 'max' in apiResponse['priceRanges'][0]:
                temp['maxPrice'] = apiResponse['priceRanges'][0]['max']
            else:
                temp['maxPrice'] = ''
        else:
            temp['maxPrice'] = ''
    else:
        temp['maxPrice'] = ''

    
    
    

    
    resultArray.append(temp)

    response = { 'result_event':resultArray}            
    apiResponse = jsonify(response)
    apiResponse.headers['Access-Control-Allow-Origin'] = '*'
    print("------------------")

    return apiResponse

@app.route('/venue', methods=["GET"])
def venue():
    name = request.args.get('venueName')
    apiKey = 'QYusuMbq0IXJ5RArS91Kap13YQXOBGi0'
    ticketMasterURL = "https://app.ticketmaster.com/discovery/v2/venues?apikey="+apiKey+"&keyword="+name
    apiResponse = requests.get(ticketMasterURL).json()
    print('VenueData',apiResponse)
    resultArray=[]
    temp={} 

 

    if '_embedded' in apiResponse:
        if 'venues' in apiResponse['_embedded']:
            if len(apiResponse['_embedded']['venues'])>0:
                required = apiResponse['_embedded']['venues'][0]
            else:
                required=''
        else:
            required = ''
    else:
        required = ''


    if 'images' in required:
        if len(apiResponse['_embedded']['venues'][0]['images'])>0:
            if 'url' in apiResponse['_embedded']['venues'][0]['images'][0]: 
                temp['venueLOGO'] = apiResponse['_embedded']['venues'][0]['images'][0]['url']
            else:
                temp['venueLOGO'] = ''
        else:
            temp['venueLOGO'] = ''
    else:
         temp['venueLOGO'] = ''
    

    if 'name' in required:
        temp['name'] = required['name']
    else:
        temp['name'] = ''
    
    if 'url' in required:
        temp['upcomingEvents'] = required['url']
    else:
        temp['upcomingEvents'] = ''
    
    if 'postalCode' in required:
        temp['postalCode'] = required['postalCode']
    else:
        temp['postalCode'] = ''
    
    if 'city' in required:
        if 'name' in required['city']:
            temp['city'] = required['city']['name']
        else:
            temp['city'] = ''
    else:
        temp['city'] = ''
    
    if 'state' in required:
        if 'name' in required['state']:
            temp['state'] = required['state']['name']
        else:
            temp['state'] = ''
    else:
        temp['state'] = ''

    if 'state' in required:
        if 'stateCode' in required['state']:
            temp['stateCode'] = required['state']['stateCode']
        else:
            temp['stateCode'] = ''
    else:
        temp['stateCode'] = ''
    
    if 'address' in required:
        if 'line1' in required['address']:
            temp['address'] = required['address']['line1']
        else:
            temp['address'] = ''
    else:
        temp['address'] = ''
    

     
    resultArray.append(temp)
    response = { 'result_event':resultArray}            
    apiResponse = jsonify(response)
    apiResponse.headers['Access-Control-Allow-Origin'] = '*'
    print("------------------")

    return apiResponse


if __name__ == '__main__':
    app.run(port='5000',debug=True)
