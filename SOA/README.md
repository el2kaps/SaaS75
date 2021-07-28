Το παρακάτω διάγραμμα αποτελεί μία πιο πρόχειρη σχεδίαση της αρχιτεκτονιής SOA του συστήματος όπως την υλοποιήσαμε η οποία όμως παρουσιάζει όλες τις λεπτομέρειες και τις αλληλεπιδράσεις των components. Τα αρχεία VPP στον φάκελο docmentation περιέχουν κι αυτά αντίστοιχο διάγραμμα.<br>

![image](https://user-images.githubusercontent.com/63153771/127073526-42b39c19-40f3-4bf8-81e7-a2a57c005ccd.png)
<br>
Εκτέλεση σε localhost : <br>
1) data-layer: port 3000
2) authentication service: port 3002
3) qa-management service: port 3001
4) statistics service: port 3003
5) user-managemnet service: port 3004
6) homepage-managemet service: port 3005
7) ESB: υλοποιήθηκε με RabbitMQ 
