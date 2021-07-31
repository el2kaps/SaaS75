Το παρακάτω διάγραμμα αποτελεί μία πιο πρόχειρη σχεδίαση (οι πλήρεις αλληλεπιδράσεις services-esb φαίνονται στο VPP αρχείο) της αρχιτεκτονιής SOA του συστήματος όπως την υλοποιήσαμε η οποία όμως παρουσιάζει όλες τις λεπτομέρειες και τις αλληλεπιδράσεις των components. Τα αρχεία VPP στον φάκελο docmentation περιέχουν κι αυτά αντίστοιχο διάγραμμα.<br>
![Untitled Diagram (12)](https://user-images.githubusercontent.com/63153771/127747754-ec739d16-c72a-4f6b-940d-2cd9cbe4f4ce.png)
<br>
Εκτέλεση σε localhost : <br>
1) data-layer: port 3000
2) authentication service: port 3002
3) qa-management service: port 3001
4) statistics service: port 3003
5) user-managemnet service: port 3004
6) homepage-managemet service: port 3005
7) ESB: υλοποιήθηκε με RabbitMQ  (https://www.cloudamqp.com/)
