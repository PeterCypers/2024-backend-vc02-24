��#   2 0 2 4 - b a c k e n d - v c 0 2 - 2 4 
 
 
 
 # #   W e b - l u i k   b a c k e n d   v o o r   S D P 2   G r o e p   V C 0 2 
 
 
 
 D i t   J a v a S c r i p t   r e p o   z a l   w e r k e n   a l s   b a c k e n d   s e r v e r   v o o r   d e   W e b   a p p l i c a t i e   v a n   D e l a w a r e . 
 
 
 
 # #   d e   g r o e p s l e d e n : 
 
 -   T i e m e n   D e r o o s e 
 
 -   M o h i s h a   V a n   D a m m e 
 
 -   B a s   S t o k m a n s 
 
 -   J a s p e r   V a n d e n b r o u c k e 
 
 -   P e t e r   C y p e r s 
 
 
 
 # #   R e q u i r e m e n t s 
 
 
 
 -   [ N o d e J S   v 2 0 . 6   o r   h i g h e r ] ( h t t p s : / / n o d e j s . o r g / ) 
 
 -   [ Y a r n ] ( h t t p s : / / y a r n p k g . c o m / ) 
 
 -   [ M y S Q L   v 8 ] ( h t t p s : / / d e v . m y s q l . c o m / d o w n l o a d s / w i n d o w s / i n s t a l l e r / 8 . 0 . h t m l )   ( n o   O r a c l e   a c c o u n t   n e e d e d ,   c l i c k   t h e   t i n y   l i n k   b e l o w   t h e   g r e y   b o x ) 
 
 -   [ M y S Q L   W o r k b e n c h ] ( h t t p s : / / d e v . m y s q l . c o m / d o w n l o a d s / w o r k b e n c h / )   ( n o   O r a c l e   a c c o u n t   n e e d e d ,   c l i c k   t h e   t i n y   l i n k   b e l o w   t h e   g r e y   b o x ) 
 
 
 
 F o r   u s e r s   o f   [ C h o c o l a t e y ] ( h t t p s : / / c h o c o l a t e y . o r g / ) : 
 
 
 
 ` ` ` p o w e r s h e l l 
 
 c h o c o   i n s t a l l   n o d e j s   - y 
 
 c h o c o   i n s t a l l   y a r n   - y 
 
 c h o c o   i n s t a l l   m y s q l   - y 
 
 c h o c o   i n s t a l l   m y s q l . w o r k b e n c h   - y 
 
 ` ` ` 
 
 
 
 # #   A l v o r e n s   o p s t a r t e n / t e s t e n   v a n   d i t   p r o j e c t 
 
 
 
 # # #   P r o j e c t   v e r b i n d e n   m e t   o n l i n e   d a t a b a s e 
 
 M a a k   e e n   n i e u w e   ` . e n v `   ( d e v e l o p m e n t )   f i l e   a a n   m e t   d e z e   t e m p l a t e . 
 
 
 
 ` ` ` i n i 
 
 N O D E _ E N V = d e v e l o p m e n t 
 
 D A T A B A S E _ H O S T = v i c h o g e n t . b e 
 
 D A T A B A S E _ P O R T = 4 0 0 5 8 
 
 D A T A B A S E _ U S E R N A M E = S D P 2 - 2 3 2 4 - V C 0 2 
 
 D A T A B A S E _ P A S S W O R D = q 4 X 9 e D 0 u 1 z e + S 7 q 0 D 
 
 ` ` ` 
 
 
 
 # # #   P r o j e c t   v e r b i n d e n   m e t   l o k a l e   d a t a b a s e 
 
 1 .   M a a k   e e n   n i e u w e   ` . e n v `   ( d e v e l o p m e n t )   f i l e   a a n   m e t   d e z e   t e m p l a t e . 
 
 
 
 ` ` ` i n i 
 
 N O D E _ E N V = d e v e l o p m e n t 
 
 D A T A B A S E _ H O S T = l o c a l h o s t 
 
 D A T A B A S E _ P O R T = 3 3 0 6 
 
 D A T A B A S E _ U S E R N A M E = < j o u w _ d b _ c o n n e c t i e _ g e b r u i k e r s n a a m > 
 
 D A T A B A S E _ P A S S W O R D = < j o u w _ d b _ c o n n e c t i e _ p a s w o o r d > 
 
 ` ` ` 
 
 
 
 2 .   M a a k   e e n   n i e u w   s c h e m a   g e n a a m d   ` s d p 2 _ 2 3 2 4 _ d b _ v c 0 2 `   a a n   i n   d e   l o k a l e   m y s q l   d a t a b a s e   m e t   m y s q l   w o r k b e n c h 
 
 
 
 3 .   V o e r   h e t   b e s t a n d   ` s d p 2 _ 2 3 2 4 _ d b _ v c 0 2 . s q l `   u i t   o p   h e t   a a n g e m a a k t e   s c h e m a   m e t     m y s q l   w o r k b e n c h ,   d i t   b e s t a n d   i s   t e   v i n d e n   i n   d e   r o o t   v a n   h e t   p r o j e c t 
 
 
 
 
 
 # #   P r o j e c t   o p s t a r t e n 
 
 
 
 -   I n s t a l l e e r   a l l e   d e p e n d e n c i e s :   ` y a r n ` 
 
 -   M a a k   e e n   ` . e n v `   f i l e   a a n   ( z i e   b o v e n ) 
 
 -   S t a r t   d e   d e v e l o p m e n t   s e r v e r :   ` y a r n   s t a r t ` 
 
 
 
 # #   P r o j e c t   t e s t e n 
 
 
 
 M a a k   e e n   n i e u w e   ` . e n v . t e s t `   ( t e s t )   f i l e   a a n   m e t   d e z e   t e m p l a t e . 
 
 
 
 ` ` ` i n i 
 
 N O D E _ E N V = t e s t 
 
 D A T A B A S E _ H O S T = l o c a l h o s t 
 
 D A T A B A S E _ P O R T = 3 3 0 6 
 
 D A T A B A S E _ U S E R N A M E = < j o u w _ d b _ c o n n e c t i e _ g e b r u i k e r s n a a m > 
 
 D A T A B A S E _ P A S S W O R D = < j o u w _ d b _ c o n n e c t i e _ p a s w o o r d > 
 
 ` ` ` 
 
 
 
 D e   t e s t s   g e b e u r e n   o p   e e n   l o k a a l   d a t a b a s e   c o n n e c t i e .   P a s   d e z e   g e g e v e n s   a a n   n a a r   j e   e i g e n   d a t a b a s e   c o n n e c t i e . 
 
 w i j   g e b r u i k e n   l o c a l h o s t   o p   p o o r t   3 3 0 6   ( e v t .   a a n p a s s e n   n a a r   j e   e i g e n   v e r k o z e n   m y s q l - c o n n e c t i e ) 
 
 
 
 -   I n s t a l l e e r   a l l e   d e p e n d e n c i e s :   ` y a r n ` 
 
 -   M a a k   e e n   ` . e n v . t e s t `   f i l e   a a n   ( z i e   b o v e n ) 
 
 -   R u n   d e   t e s t s   o p   d e   s e r v e r :   ` y a r n   t e s t ` 