# 05-reactive-forms

1. Dodaj do aplikacji rick-and-morty przycisk zaloguj, który będzie widoczny tylko wtedy kiedy użytkownik nie jest zalogowany
2. Po kliknięciu w przycisk przejdź na route `/auth` gdzie użytkownik będzie widział dwa inputy (nazwa użytkownika / hasło)
3. Po wpisaniu dowolnej wartości możesz się "zalogować" czyli zostać przekierowany na dowolną listę z aplikacji rick-and-morty
4. Po zalogowaniu użytkownik powinien widzieć informację "Zalogowano!" oraz przycisk wyloguj, który wyczyści stan zalogowania po kliknięciu, ale użytkownik zostanie na tej samej liście (nie musisz przekierowywać)

Zwróć uwagę gdzie trzymać stan zalogowania, jakie metody powinny być udostępnione na zewnątrz, oraz gdzie dodać przycisk zalogowania/wylogowywania
