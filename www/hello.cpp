#include <iostream>
#include <fstream>
#include <algorithm>
#include <string>
#include <cmath>
#include <utility>
#include <vector>
#include <map>
#include <list>
#include <queue>
#include <stack>
#include <set>
#include <functional>
#include <sstream>

using namespace std;

string toString(int n){ostringstream ost;ost<<n;ost.flush();return ost.str();}
int toInt(string s){int r=0;istringstream sin(s);sin>>r;return r;}
bool isprime(int m){if(m<2) return 0;for( int i=2; i*i<=m ; i++)if(m%i==0)return 0; return 1;return 0;}

# define FOR(i, a, b) for (int i=a; i<b; i++)
# define REP(i, a) FOR(i,0,a)
# define all(c) (c).begin(), (c).end()
# define sz(x) x.size()
# define pb push_back
# define MP make_pair
# define SBS(s,a,b) (s).substr(a,b)
# define UNQ(s) {sort(all(s));(s).erase(unique(all(s)),s.end());}
# define rive(s) reverse(s.begin(),s.end())
# define VI vector<int>
# define VS vector<string>
# define VC vector<char>
# define out(a) cout<<a<<endl;

int main()
{
  ifstream fin ("hello.in");
  ofstream fout ("hello.out");

  out("hello world");

  return 0;
}
